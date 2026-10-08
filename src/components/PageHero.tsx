import { useTranslation } from "react-i18next";
import { motion, MotionConfig } from "framer-motion";
import DOMPurify from "dompurify";
import { useSiteImages } from "@/hooks/useSiteImages";
import { VisualBreadcrumb, type BreadcrumbNavItem } from "@/components/VisualBreadcrumb";

interface PageHeroProps {
  titleKey: string;
  titleHighlightKey: string;
  descriptionKey: string;
  backgroundImage?: string;
  /** 使用动态配图的 key，优先级高于 backgroundImage */
  imageConfigKey?: string;
  /** Visual breadcrumb navigation items */
  breadcrumbs?: BreadcrumbNavItem[];
}

export const PageHero = ({ 
  titleKey, 
  titleHighlightKey, 
  descriptionKey,
  backgroundImage,
  imageConfigKey,
  breadcrumbs,
}: PageHeroProps) => {
  const { t } = useTranslation();
  const { getImageUrl, getOptimizedImageUrl } = useSiteImages();

  // 优先使用动态配图，并应用 Supabase 图片优化
  const rawBgImage = imageConfigKey ? getImageUrl(imageConfigKey) : backgroundImage;
  // 对 Supabase 存储图片应用变换
  const bgImage = rawBgImage && rawBgImage.includes('supabase.co/storage')
    ? (imageConfigKey ? getOptimizedImageUrl(imageConfigKey, { width: 1920, quality: 75 }) : rawBgImage)
    : rawBgImage;

  return (
    <MotionConfig reducedMotion="user">
    <section className="relative py-16 md:py-24 bg-hero overflow-hidden">
      {/* Background */}
      {bgImage ? (
        <div className="absolute inset-0">
          <img
            src={bgImage}
            alt={`${t(titleKey)} ${t(titleHighlightKey)} - NinescapeLand`}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            width="1920"
            height="600"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-hero" />
      )}
      
      {/* Content */}
      <div className="container-wide relative z-10">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6">
            <VisualBreadcrumb items={breadcrumbs} variant="hero" />
          </div>
        )}

        <div className="max-w-4xl text-start">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-hero-foreground leading-tight mb-6"
          >
            {t(titleKey)}
            <span className="block text-accent mt-2">{t(titleHighlightKey)}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-hero-foreground/80 max-w-2xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(descriptionKey), { ALLOWED_TAGS: ['strong', 'b', 'em'] }) }}
          />
        </div>
      </div>
    </section>
    </MotionConfig>
  );
};
