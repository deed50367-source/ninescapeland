/**
 * 图库图片配置
 * 这些图片来自 Supabase Storage 的 assets bucket
 * file_path 是存储在 assets 表中的路径
 */

// Supabase Storage URL 构建
const STORAGE_URL = `https://gianldlquknsdhfpqqfe.supabase.co/storage/v1/object/public/assets`;

// 获取存储图片的完整URL
export const getStorageUrl = (filePath: string): string => {
  return `${STORAGE_URL}/${filePath}`;
};

// 页面 Hero 背景图片配置
export const heroImages = {
  // 首页 Hero - 使用深圳项目的外景图
  home: getStorageUrl("df79ab35-d540-48bc-b93c-44569106b132/1768293490535-9pua6a.jpg"), // A_Exterior - Main View
  
  // 产品页 Hero - 使用室内游乐场渲染图
  products: getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294274127-w29hc.jpg"), // C_28 - 照片
  
  // 关于我们 Hero - 使用项目外观图
  aboutUs: getStorageUrl("df79ab35-d540-48bc-b93c-44569106b132/1768293492702-lrv778.jpg"), // A_Exterior - Urban Setting
  
  // 流程页 Hero
  process: getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294282861-8dkfa.jpg"), // C_30 - 照片
  
  // 项目案例 Hero
  projects: getStorageUrl("df79ab35-d540-48bc-b93c-44569106b132/1768293480589-nkfvik.jpg"), // A_Exterior - Crossing
  
  // FAQ Hero
  faq: getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294287219-kmtl6.jpg"), // C_Existing Image
  
  // 联系我们 Hero
  contact: getStorageUrl("df79ab35-d540-48bc-b93c-44569106b132/1768293483392-f9qbbm.jpg"), // A_Exterior - Detail Restaurant
};

// 产品卡片图片配置
export const productImages = {
  // 室内游乐场
  indoorPlayground: getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294376731-g5jiv8.jpg"), // 白底图 1.png (5000x2779)
  
  // 蹦床公园
  trampolinePark: getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294624727-6ia03.jpg"), // 蹦床设计图 12(5)
  
  // 忍者课程
  ninjaCourse: getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294381259-ig9ii.jpg"), // 白底图 2-2.png
  
  // 软体游乐
  softPlay: getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294400190-bx9gha.jpg"), // 白底图 6.png
};

// 项目案例图片配置
export const projectImages = {
  bouncePark: getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294614701-b5b7pw.jpg"), // 蹦床设计图 12(1)
  fecCenter: getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294300068-ysxbww.jpg"), // D_33 - 照片
};

// 特性区块图片配置
export const featureImages = {
  trampoline: getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294619294-xsbwg.jpg"), // 蹦床设计图 12(3)
  ninja: getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294404756-dg7aeb.jpg"), // 白底图 7-1.png
};
