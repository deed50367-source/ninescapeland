#!/usr/bin/env bash
# 04 每日备份（迁移后必须做，托管方的自动备份没有了）
# 安装：cp 04-backup.sh /opt/backup.sh && chmod +x /opt/backup.sh
#      crontab -e  ->  15 3 * * * /opt/backup.sh >> /var/log/pgbackup.log 2>&1
set -euo pipefail

COMPOSE_DIR="${COMPOSE_DIR:-/opt/supabase}"
DEST="${DEST:-/opt/backups}"
KEEP_DAYS="${KEEP_DAYS:-14}"
STAMP=$(date +%Y%m%d-%H%M)

mkdir -p "$DEST"
cd "$COMPOSE_DIR"

# 数据库全量
docker compose exec -T db pg_dump -U postgres -d postgres -Fc \
  > "$DEST/db-$STAMP.dump"

# 存储文件（file 后端落在 storage 卷里）
docker run --rm \
  -v supabase_storage:/data:ro \
  -v "$DEST":/backup alpine \
  tar czf "/backup/storage-$STAMP.tar.gz" -C /data .

# 清理过期
find "$DEST" -name 'db-*.dump' -mtime +$KEEP_DAYS -delete
find "$DEST" -name 'storage-*.tar.gz' -mtime +$KEEP_DAYS -delete

echo "备份完成 $STAMP  $(du -sh "$DEST" | cut -f1)"

# ⚠️ 异地副本（务必配置，本机备份挡不住磁盘损坏）：
# rclone copy "$DEST" remote:ninescapeland-backup --max-age 24h
#
# ⚠️ 恢复演练（上线后 7 天内必须实测一次）：
# docker compose exec -T db pg_restore -U postgres -d postgres --clean < db-xxx.dump
