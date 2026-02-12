import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    key: "indoorPlayground",
    href: "/products/indoor-playground",
    icon: "🎢",
    titleKey: "products.items.indoorPlayground.title",
  },
  {
    key: "trampolinePark",
    href: "/products/trampoline-park",
    icon: "🦘",
    titleKey: "products.items.trampolinePark.title",
  },
  {
    key: "ninjaCourse",
    href: "/products/ninja-course",
    icon: "🥷",
    titleKey: "products.items.ninjaCourse.title",
  },
  {
    key: "softPlay",
    href: "/products/soft-play",
    icon: "🧸",
    titleKey: "products.items.softPlay.title",
  },
  {
    key: "activePlay",
    href: "/best-indoorplaygroundsolution-active-play-for-running-facilities",
    icon: "🏃",
    titleKey: "activePlayRunning.breadcrumb",
  },
  {
    key: "officeWellness",
    href: "/indoorplaygroundsolution-office-wellness-solutions",
    icon: "🏢",
    titleKey: "officeWellness.breadcrumb",
  },
];

export const PopularCategoriesSection = () => {
  const { t } = useTranslation();
  const { localizedPath } = useLocalizedPath();

  return (
    <section className="py-12 sm:py-16 bg-muted/40">
      <div className="container-wide">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-8">
          {t("popularCategories.title", "Popular Categories")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={localizedPath(cat.href)}
              className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-card border hover:border-primary/40 hover:shadow-md transition-all"
            >
              <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-sm font-medium text-center text-foreground group-hover:text-primary transition-colors">
                {t(cat.titleKey)}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
