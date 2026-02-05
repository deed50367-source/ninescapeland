import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { List, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  content: string | null;
  className?: string;
}

export const BlogTableOfContents = ({ content, className }: BlogTableOfContentsProps) => {
  const { t } = useTranslation();
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Extract headings from HTML content
  useEffect(() => {
    if (!content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = doc.querySelectorAll("h2, h3");
    
    const items: TOCItem[] = [];
    headings.forEach((heading, index) => {
      const text = heading.textContent?.trim() || "";
      if (text) {
        const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`;
        items.push({
          id,
          text,
          level: heading.tagName === "H2" ? 2 : 3
        });
      }
    });
    
    setTocItems(items);
  }, [content]);

  // Add IDs to actual headings in the DOM after render
  useEffect(() => {
    if (tocItems.length === 0) return;

    const articleContent = document.querySelector(".blog-content");
    if (!articleContent) return;

    const headings = articleContent.querySelectorAll("h2, h3");
    headings.forEach((heading, index) => {
      const item = tocItems[index];
      if (item) {
        heading.id = item.id;
      }
    });
  }, [tocItems]);

  // Track active heading on scroll
  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
        threshold: 0
      }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  if (tocItems.length === 0) return null;

  return (
    <nav 
      aria-label="Table of contents" 
      className={cn(
        "bg-card border border-border rounded-xl p-4 shadow-soft",
        className
      )}
    >
      {/* Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm">{t("blog.toc.title", "Table of Contents")}</span>
        </div>
        <ChevronUp 
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            isCollapsed && "rotate-180"
          )} 
        />
      </button>

      {/* TOC Items */}
      {!isCollapsed && (
        <ol className="space-y-1 text-sm max-h-[60vh] overflow-y-auto">
          {tocItems.map((item, index) => (
            <li 
              key={item.id}
              className={cn(
                item.level === 3 && "ml-4"
              )}
            >
              <button
                onClick={() => scrollToHeading(item.id)}
                className={cn(
                  "w-full text-left py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-muted",
                  "border-l-2 -ml-0.5",
                  activeId === item.id
                    ? "border-primary text-primary bg-primary/5 font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                )}
              >
                <span className="line-clamp-2">{item.text}</span>
              </button>
            </li>
          ))}
        </ol>
      )}

      {/* Progress indicator */}
      {!isCollapsed && activeId && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{t("blog.toc.progress", "Progress")}</span>
            <span>{Math.round((tocItems.findIndex(i => i.id === activeId) + 1) / tocItems.length * 100)}%</span>
          </div>
          <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ 
                width: `${((tocItems.findIndex(i => i.id === activeId) + 1) / tocItems.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};