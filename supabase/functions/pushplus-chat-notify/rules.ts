export function shouldNotify(message: { role: string; is_staff_reply: boolean | null }): boolean {
  return message.role === 'user' && message.is_staff_reply !== true;
}

export function notificationContent(createdAt: string): string {
  return `网站收到一条访客消息，请及时查看并跟进。\n时间：${createdAt}\n查看会话：https://indoorplaygroundsolution.com/admin\n完整消息与联系方式请在有权限的客服后台查看。`;
}