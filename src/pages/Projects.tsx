import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { heroImages } from "@/config/galleryImages";

const Projects = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          titleKey="pages.projects.title"
          titleHighlightKey="pages.projects.titleHighlight"
          descriptionKey="pages.projects.description"
          backgroundImage={heroImages.projects}
        />
        <ProjectsSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Projects;