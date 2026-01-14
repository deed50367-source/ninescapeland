import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProjectsStatsSection } from "@/components/ProjectsStatsSection";
import { ProjectsMapSection } from "@/components/ProjectsMapSection";
import { ProjectTypesSection } from "@/components/ProjectTypesSection";
import { ProjectsTestimonialsSection } from "@/components/ProjectsTestimonialsSection";
import { ProjectsCTASection } from "@/components/ProjectsCTASection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import MobileBottomNav from "@/components/MobileBottomNav";
import { heroImages } from "@/config/galleryImages";

const Projects = () => {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        <PageHero
          titleKey="pages.projects.title"
          titleHighlightKey="pages.projects.titleHighlight"
          descriptionKey="pages.projects.description"
          backgroundImage={heroImages.projects}
        />
        <ProjectsStatsSection />
        <ProjectsSection />
        <ProjectTypesSection />
        <ProjectsMapSection />
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
