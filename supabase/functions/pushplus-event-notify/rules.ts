const titles: Record<string, string> = {
  new_inquiry: '网站新询盘',
  lead_captured: '智能客服收到联系方式',
  handoff_requested: '访客请求人工客服',
  human_joined: '人工客服已接手',
};
export function eventTitle(type: string): string | undefined { return titles[type]; }
export function eventContent(type: string, createdAt: string): string {
  return `${eventTitle(type)}，请登录后台查看并跟进。\n时间：${createdAt}\n后台：https://indoorplaygroundsolution.com/admin\n联系方式和完整内容仅在有权限的后台显示。`;
}