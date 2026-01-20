import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEOHead 
        pageKey="home" 
        dynamicTitle="404 - Page Not Found | NinescapeLand"
        dynamicDescription="The page you are looking for does not exist."
        noIndex={true}
      />
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="mb-4 text-2xl md:text-3xl font-bold">{t("notFound.title", "Oops! Page not found")}</h1>
        <p className="mb-8 text-muted-foreground max-w-md mx-auto">
          {t("notFound.description", "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.")}
        </p>
        <Button asChild size="lg">
          <Link to="/en">
            <Home className="w-4 h-4 mr-2" />
            {t("notFound.backHome", "Return to Home")}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
