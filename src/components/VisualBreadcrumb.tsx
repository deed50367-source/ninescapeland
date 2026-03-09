import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Home } from "lucide-react";
import { useRTL } from "@/hooks/useRTL";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbNavItem {
  label: string;
  href?: string;
}

interface VisualBreadcrumbProps {
  items: BreadcrumbNavItem[];
  /** Render on dark background (e.g. inside PageHero) */
  variant?: "default" | "hero";
}

export const VisualBreadcrumb = ({ items, variant = "default" }: VisualBreadcrumbProps) => {
  const { isRTL } = useRTL();
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  const textClass = variant === "hero"
    ? "text-primary-foreground/70 hover:text-primary-foreground"
    : "text-muted-foreground hover:text-foreground";
  const activeClass = variant === "hero"
    ? "text-primary-foreground"
    : "text-foreground";
  const separatorClass = variant === "hero"
    ? "text-primary-foreground/40"
    : "";

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <BreadcrumbItem key={index}>
              {index > 0 && (
                <BreadcrumbSeparator className={separatorClass}>
                  <Chevron className="w-3.5 h-3.5" />
                </BreadcrumbSeparator>
              )}
              {isLast ? (
                <BreadcrumbPage className={activeClass}>
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild className={textClass}>
                  <Link to={item.href || "/"} className="flex items-center gap-1">
                    {index === 0 && <Home className="w-3.5 h-3.5" />}
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
