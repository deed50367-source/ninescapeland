import { useState, useEffect } from "react";
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
  // 产品图片
  "product.indoorPlayground": "adaf5265-c979-48b7-b4c1-808e1e4b87b8/1768294592888-x69bgi.jpg",
  "product.trampolinePark": "88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294617155-efd0q8.jpg",
  "product.ninjaCourse": "root/1768967512755-1708914619333.jpg",
  "product.softPlay": "dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294400190-bx9gha.jpg",
  // 项目案例图片
  "project.bouncePark": "0d55c23f-ae63-47b1-b850-bb97872cf518/1768294349256-ahzwfa.jpg",
  "project.fecCenter": "6e6b4c6d-2efc-446e-a7f4-8e98c91c81cc/1768294529825-ob7ylk.jpg",
  "project.indoorProject": "39a9c37a-1063-4ba6-94d1-4e0cca1123e9/1768294471406-lp0vzf.jpg",
  "project.ninjaProject": "root/1768967509253-1708914541597.jpg",
  // 特性区图片
  "feature.trampoline": "88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294621773-h93mw.jpg",
  "feature.ninja": "root/1768967509253-1708914541597.jpg",
};

// 缓存
let cachedImages: Record<string, string> | null = null;
let cachePromise: Promise<Record<string, string>> | null = null;

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
  
  return images;
};

export const getSiteImageUrl = (key: string): string => {
  const path = cachedImages?.[key] || defaultImages[key] || "";
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http")) return path;
  return `${STORAGE_URL}/${path}`;
};

export const useSiteImages = () => {
  const [images, setImages] = useState<Record<string, string>>(cachedImages || defaultImages);
  const [isLoading, setIsLoading] = useState(!cachedImages);

  useEffect(() => {
    const load = async () => {
      if (cachedImages) {
        setImages(cachedImages);
        setIsLoading(false);
        return;
      }

      if (!cachePromise) {
        cachePromise = fetchImages();
      }
      
      const result = await cachePromise;
      cachedImages = result;
      setImages(result);
      setIsLoading(false);
    };
    
    load();
  }, []);

  const getImageUrl = (key: string): string => {
    const path = images[key] || defaultImages[key] || "";
    if (!path) return "/placeholder.svg";
    if (path.startsWith("http")) return path;
    return `${STORAGE_URL}/${path}`;
  };

  const refresh = async () => {
    setIsLoading(true);
    cachedImages = null;
    cachePromise = null;
    const result = await fetchImages();
    cachedImages = result;
    setImages(result);
    setIsLoading(false);
  };

  return { images, isLoading, getImageUrl, refresh };
};

// 便捷函数 - 预加载图片配置
export const preloadSiteImages = async () => {
  if (cachedImages) return cachedImages;
  if (!cachePromise) {
    cachePromise = fetchImages();
  }
  cachedImages = await cachePromise;
  return cachedImages;
};
