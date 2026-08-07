#!/usr/bin/env node
/**
 * 03 存储桶迁移：把旧实例 assets 桶的全部对象搬到新实例同名桶。
 * 保持 object path 完全一致 —— 数据库里存的图片字段就不用改。
 *
 * 在 VPS 上执行（约 8GB / 3100+ 文件，建议 screen 里跑）：
 *   OLD_URL=https://<旧实例>.supabase.co \
 *   OLD_KEY=<旧 service_role key> \
 *   NEW_URL=https://api.indoorplaygroundsolution.com \
 *   NEW_KEY=<新 service_role key> \
 *   node 03-storage-sync.mjs
 *
 * 支持断点续传：已存在同名对象默认跳过（OVERWRITE=1 可强制覆盖）。
 */
const OLD_URL = must("OLD_URL"), OLD_KEY = must("OLD_KEY");
const NEW_URL = must("NEW_URL"), NEW_KEY = must("NEW_KEY");
const BUCKET = process.env.BUCKET || "assets";
const OVERWRITE = process.env.OVERWRITE === "1";
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);

function must(k) {
  const v = process.env[k];
  if (!v) { console.error(`缺少环境变量 ${k}`); process.exit(1); }
  return v;
}

async function listAll(prefix = "") {
  const out = [];
  let offset = 0;
  for (;;) {
    const res = await fetch(`${OLD_URL}/storage/v1/object/list/${BUCKET}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${OLD_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ prefix, limit: 1000, offset, sortBy: { column: "name", order: "asc" } }),
    });
    if (!res.ok) throw new Error(`list ${prefix} -> ${res.status} ${await res.text()}`);
    const page = await res.json();
    if (!page.length) break;
    for (const item of page) {
      const path = prefix ? `${prefix}/${item.name}` : item.name;
      if (item.id === null) out.push(...(await listAll(path)));   // 文件夹
      else out.push({ path, size: item.metadata?.size ?? 0, mime: item.metadata?.mimetype });
    }
    if (page.length < 1000) break;
    offset += 1000;
  }
  return out;
}

async function exists(path) {
  const res = await fetch(`${NEW_URL}/storage/v1/object/info/${BUCKET}/${encodeURI(path)}`, {
    headers: { Authorization: `Bearer ${NEW_KEY}` },
  });
  return res.ok;
}

async function copyOne(obj) {
  if (!OVERWRITE && (await exists(obj.path))) return "skip";
  const dl = await fetch(`${OLD_URL}/storage/v1/object/${BUCKET}/${encodeURI(obj.path)}`, {
    headers: { Authorization: `Bearer ${OLD_KEY}` },
  });
  if (!dl.ok) throw new Error(`下载失败 ${obj.path} -> ${dl.status}`);
  const buf = Buffer.from(await dl.arrayBuffer());
  const up = await fetch(`${NEW_URL}/storage/v1/object/${BUCKET}/${encodeURI(obj.path)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NEW_KEY}`,
      "Content-Type": obj.mime || dl.headers.get("content-type") || "application/octet-stream",
      "x-upsert": "true",
      "cache-control": "max-age=31536000",
    },
    body: buf,
  });
  if (!up.ok) throw new Error(`上传失败 ${obj.path} -> ${up.status} ${await up.text()}`);
  return "ok";
}

const objects = await listAll();
console.log(`共 ${objects.length} 个对象，合计 ${(objects.reduce((s, o) => s + Number(o.size), 0) / 1048576).toFixed(0)} MB`);

let ok = 0, skip = 0, fail = 0;
const failed = [];
const queue = [...objects];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (;;) {
      const obj = queue.pop();
      if (!obj) return;
      try {
        (await copyOne(obj)) === "skip" ? skip++ : ok++;
      } catch (e) {
        fail++; failed.push(obj.path); console.error(String(e.message));
      }
      if ((ok + skip + fail) % 100 === 0) console.log(`进度 ${ok + skip + fail}/${objects.length}  ok=${ok} skip=${skip} fail=${fail}`);
    }
  })
);
console.log(`完成：ok=${ok} skip=${skip} fail=${fail}`);
if (failed.length) console.log("失败清单：\n" + failed.join("\n"));
process.exit(fail ? 1 : 0);
