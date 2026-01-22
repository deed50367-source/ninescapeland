/**
 * 图库图片配置
 * 这些图片来自 Supabase Storage 的 assets bucket
 * 
 * 配图选择原则:
 * - 首页Hero: 综合性的游乐场全景图，展示品牌实力
 * - 产品页: 多种产品的综合展示
 * - 关于我们: 展示公司实力和专业性
 * - 流程页: 展示设计和安装过程
 * - 项目案例: 展示完成的项目
 * - FAQ: 友好的客服/咨询场景
 * - 联系我们: 专业的商务场景
 */

// Supabase Storage URL 构建
const STORAGE_URL = `https://gianldlquknsdhfpqqfe.supabase.co/storage/v1/object/public/assets`;

// 获取存储图片的完整URL
export const getStorageUrl = (filePath: string): string => {
  return `${STORAGE_URL}/${filePath}`;
};

/**
 * 页面 Hero 背景图片配置
 */
export const heroImages = {
  // 首页 Hero - "Create Unforgettable Play Experiences"
  // 使用深圳项目的室内全景图，展示完整的游乐空间
  home: getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294274127-w29hc.jpg"), // C_28 - 室内大厅全景
  
  // 产品页 Hero - "Premium Playground Solutions"
  // 使用蹦床公园的俯视图，展示多样化产品
  products: getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294624727-6ia03.jpg"), // 蹦床公园 12(5) - 俯视全景
  
  // 关于我们 Hero - "About NinescapeLand"
  // 使用项目外观图，展示公司实力和专业形象
  aboutUs: getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294227826-xtmqbx.jpg"), // A_Exterior - Main View 建筑外观
  
  // 流程页 Hero - "Your Journey to Grand Opening"
  // 使用3D设计图，展示从设计到完成的过程
  process: getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294619294-xsbwg.jpg"), // 蹦床设计图 12(3) - 设计效果图
  
  // 项目案例 Hero - "Global Success Stories"
  // 使用完工项目图，展示成功案例
  projects: getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294282861-8dkfa.jpg"), // C_30 - 完工内景
  
  // FAQ Hero - "Questions? We Have Answers"
  // 使用友好的室内场景
  faq: getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294287219-kmtl6.jpg"), // C_Existing Image - 温馨场景
  
  // 联系我们 Hero - "Start Your Project Today"
  // 使用专业的场景图
  contact: getStorageUrl("e781d029-b8d9-4101-8835-35d1d8938a12/1768294300068-ysxbww.jpg"), // D_33 - 专业展示
};

/**
 * 产品卡片图片配置
 * 每个产品使用最能代表该类型的图片
 */
export const productImages = {
  // 室内游乐场 - "Indoor Playground Equipment"
  // 使用淘气堡3D渲染图
  indoorPlayground: getStorageUrl("adaf5265-c979-48b7-b4c1-808e1e4b87b8/1768294592888-x69bgi.jpg"), // play zone equipment manufacturers
  
  // 蹦床公园 - "Trampoline Parks"
  // 使用蹦床区域的全景图
  trampolinePark: getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294617155-efd0q8.jpg"), // 蹦床设计图 12(2) - 蹦床区域
  
  // 忍者课程 - "Ninja Warrior Courses"
  // 使用3D效果渲染图
  ninjaCourse: getStorageUrl("root/1768967512755-1708914619333.jpg"), // 忍者课程3D效果图
  
  // 软体游乐 - "Soft Play Areas"
  // 使用适合幼儿的软体游乐设备
  softPlay: getStorageUrl("dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294400190-bx9gha.jpg"), // 白底图 6.png - 软体游乐
};

/**
 * 项目案例图片配置
 */
export const projectImages = {
  // 蹦床公园项目
  bouncePark: getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294614701-b5b7pw.jpg"), // 蹦床设计图 12(1)
  
  // 家庭娱乐中心项目 - 使用淘气堡图
  fecCenter: getStorageUrl("a8ce1619-1616-4719-83ae-cc72234f2a29/1768294521549-5d1e3a.jpg"), // play zone equipment
  
  // 室内游乐场项目
  indoorProject: getStorageUrl("0a456f96-af25-4386-b083-7c266fb8cdb1/1768294567562-zh3e7c.jpg"), // indoor playground from china
  
  // 忍者挑战区项目
  ninjaProject: getStorageUrl("root/1768967510986-1708914597457.jpg"), // 忍者课程3D效果图
};

/**
 * 特性区块图片配置
 */
export const featureImages = {
  // 蹦床特性区 - 展示蹦床活动区
  trampoline: getStorageUrl("88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294621773-h93mw.jpg"), // 蹦床设计图 12(4)
  
  // 忍者特性区 - 展示忍者挑战设备
  ninja: getStorageUrl("root/1768967509253-1708914541597.jpg"), // 忍者课程3D效果图
};
