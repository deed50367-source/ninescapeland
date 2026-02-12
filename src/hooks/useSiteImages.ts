import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteImageConfig {
  config_key: string;
  image_url: string;
}

const STORAGE_URL = `https://gianldlquknsdhfpqqfe.supabase.co/storage/v1/object/public/assets`;

// 默认配置，作为后备
const defaultImages: Record<string, string> = {
  // Hero 图片
  "hero.home": "e781d029-b8d9-4101-8835-35d1d8938a12/1768294274127-w29hc.jpg",
  "hero.products": "88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294624727-6ia03.jpg",
  "hero.aboutUs": "e781d029-b8d9-4101-8835-35d1d8938a12/1768294227826-xtmqbx.jpg",
  "hero.process": "88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294619294-xsbwg.jpg",
  "hero.projects": "e781d029-b8d9-4101-8835-35d1d8938a12/1768294282861-8dkfa.jpg",
  "hero.faq": "e781d029-b8d9-4101-8835-35d1d8938a12/1768294287219-kmtl6.jpg",
  "hero.contact": "e781d029-b8d9-4101-8835-35d1d8938a12/1768294300068-ysxbww.jpg",
  // 产品图片 - 按产品类型严格分类
  // 淘气堡 (Indoor Playground) - 使用淘气堡文件夹素材
  "product.indoorPlayground": "adaf5265-c979-48b7-b4c1-808e1e4b87b8/1768294592888-x69bgi.jpg",
  // 蹦床公园 (Trampoline Park) - 使用蹦床设计图文件夹素材
  "product.trampolinePark": "88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294617155-efd0q8.jpg",
  // 忍者课程 (Ninja Course) - 使用忍者课程素材
  "product.ninjaCourse": "root/1768967512755-1708914619333.jpg",
  // 软体游乐 (Soft Play) - 使用白底图/软体游乐素材
  "product.softPlay": "dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294376731-g5jiv8.jpg",
  // 项目案例图片
  "project.indoorProject": "39a9c37a-1063-4ba6-94d1-4e0cca1123e9/1768294475255-l18ht.jpg",
  "project.trampolineProject": "88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294621773-h93mw.jpg",
  "project.ninjaProject": "root/1768967509253-1708914541597.jpg",
  "project.softPlayProject": "dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294381259-ig9ii.jpg",
  "project.fecCenter": "6e6b4c6d-2efc-446e-a7f4-8e98c91c81cc/1768294529825-ob7ylk.jpg",
  "project.bouncePark": "0d55c23f-ae63-47b1-b850-bb97872cf518/1768294349256-ahzwfa.jpg",
  // 特性区图片
  "feature.trampoline": "88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294621773-h93mw.jpg",
  "feature.ninja": "root/1768967509253-1708914541597.jpg",
};

// 缓存
let cachedImages: Record<string, string> | null = null;
let cachePromise: Promise<Record<string, string>> | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

const fetchImages = async (): Promise<Record<string, string>> => {
  const { data, error } = await supabase
    .from("site_image_config")
    .select("config_key, image_url");
  
  if (error || !data) {
    console.error("Failed to fetch site images:", error);
    return defaultImages;
  }
  
  const images: Record<string, string> = { ...defaultImages };
  data.forEach((item: SiteImageConfig) => {
    images[item.config_key] = item.image_url;
  });
  
  cacheTimestamp = Date.now();
  return images;
};

// 构建完整URL
const buildImageUrl = (path: string): string => {
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http")) return path;
  return `${STORAGE_URL}/${path}`;
};

// 构建带 Supabase Storage Transformation 参数的优化 URL
interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'origin';
}

const buildOptimizedUrl = (baseUrl: string, options: ImageTransformOptions = {}): string => {
  if (!baseUrl || baseUrl === "/placeholder.svg") return baseUrl;
  
  // Only apply transforms to Supabase storage URLs
  if (!baseUrl.includes('supabase.co/storage')) return baseUrl;
  
  // Use render endpoint for transformations
  const renderUrl = baseUrl.replace(
    '/storage/v1/object/public/',
    '/storage/v1/render/image/public/'
  );
  
  const url = new URL(renderUrl);
  if (options.width) url.searchParams.set('width', options.width.toString());
  if (options.height) url.searchParams.set('height', options.height.toString());
  url.searchParams.set('quality', (options.quality || 75).toString());
  url.searchParams.set('format', options.format || 'webp');
  
  return url.toString();
};

export const getSiteImageUrl = (key: string): string => {
  const path = cachedImages?.[key] || defaultImages[key] || "";
  return buildImageUrl(path);
};

// 检查缓存是否过期
const isCacheValid = (): boolean => {
  return cachedImages !== null && (Date.now() - cacheTimestamp) < CACHE_DURATION;
};

export const useSiteImages = () => {
  const [images, setImages] = useState<Record<string, string>>(cachedImages || defaultImages);
  const [isLoading, setIsLoading] = useState(!cachedImages);

  const loadImages = useCallback(async (forceRefresh = false) => {
    // 如果不强制刷新且缓存有效，使用缓存
    if (!forceRefresh && isCacheValid() && cachedImages) {
      setImages(cachedImages);
      setIsLoading(false);
      return;
    }

    // 如果已有加载中的请求，等待它完成
    if (!forceRefresh && cachePromise) {
      const result = await cachePromise;
      cachedImages = result;
      setImages(result);
      setIsLoading(false);
      return;
    }

    // 发起新请求
    cachePromise = fetchImages();
    const result = await cachePromise;
    cachedImages = result;
    setImages(result);
    setIsLoading(false);
    cachePromise = null;
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const getImageUrl = useCallback((key: string): string => {
    const path = images[key] || defaultImages[key] || "";
    return buildImageUrl(path);
  }, [images]);

  // 获取带优化参数的图片 URL（用于首屏大图）
  const getOptimizedImageUrl = useCallback((key: string, options: ImageTransformOptions = {}): string => {
    const rawUrl = getImageUrl(key);
    return buildOptimizedUrl(rawUrl, options);
  }, [getImageUrl]);

  // 获取产品图库图片数组
  const getProductGalleryImages = useCallback((productType: string, count: number = 6): string[] => {
    const galleryImages: string[] = [];
    
    const mainKey = `product.${productType}`;
    const mainPath = images[mainKey] || defaultImages[mainKey];
    if (mainPath) {
      galleryImages.push(buildImageUrl(mainPath));
    }
    
    for (let i = 2; i <= count; i++) {
      const key = `product.${productType}.${i}`;
      const path = images[key];
      if (path) {
        galleryImages.push(buildImageUrl(path));
      }
    }
    
    return galleryImages;
  }, [images]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    cachedImages = null;
    cachePromise = null;
    cacheTimestamp = 0;
    const result = await fetchImages();
    cachedImages = result;
    setImages(result);
    setIsLoading(false);
  }, []);

  return { images, isLoading, getImageUrl, getOptimizedImageUrl, getProductGalleryImages, refresh };
};

// 便捷函数 - 预加载图片配置
export const preloadSiteImages = async () => {
  if (isCacheValid() && cachedImages) return cachedImages;
  if (!cachePromise) {
    cachePromise = fetchImages();
  }
  cachedImages = await cachePromise;
  cachePromise = null;
  return cachedImages;
};

// 清除缓存（用于管理后台更新后）
export const clearSiteImagesCache = () => {
  cachedImages = null;
  cachePromise = null;
  cacheTimestamp = 0;
};
