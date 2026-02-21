import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProjectsStatsSection } from "@/components/ProjectsStatsSection";
import { InteractiveWorldMap } from "@/components/InteractiveWorldMap";
import { ProjectTypesSection } from "@/components/ProjectTypesSection";
import { ProjectsTestimonialsSection } from "@/components/ProjectsTestimonialsSection";
import { ProjectsCTASection } from "@/components/ProjectsCTASection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import MobileBottomNav from "@/components/MobileBottomNav";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";

const Projects = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { name: t("nav.home", "Home"), url: "https://indoorplaygroundsolution.com" },
    { name: t("nav.projects", "Projects"), url: "https://indoorplaygroundsolution.com/projects" },
  ];

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <SEOHead pageKey="projects" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      <main>
        <PageHero
          titleKey="pages.projects.title"
          titleHighlightKey="pages.projects.titleHighlight"
          descriptionKey="pages.projects.description"
          imageConfigKey="hero.projects"
        />
        <ProjectsStatsSection />
        <ProjectsSection />
        <ProjectTypesSection />
        <InteractiveWorldMap />
        <ProjectsTestimonialsSection />
        <ProjectsCTASection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
      <MobileBottomNav />
    </div>
  );
};

export default Projects;
