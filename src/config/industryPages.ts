import {
  Building2,
  Heart,
  GraduationCap,
  ShoppingCart,
  Landmark,
  Scale,
  Megaphone,
  Users,
  Truck,
  Factory,
  TrendingUp,
  Shield,
  Palette,
  Wrench,
  BarChart3,
  Star,
  Clock,
  Target,
  Zap,
  Award,
  type LucideIcon,
} from "lucide-react";

export interface IndustryPageConfig {
  slug: string;
  variable: string;
  heroIcon: LucideIcon;
  /** i18n namespace key under "industryPages.<key>" */
  i18nKey: string;
  /** Related product links */
  relatedProductSlug: string;
  /** Stats icons */
  statsIcons: LucideIcon[];
  /** Section 1 feature icons */
  section1Icons: LucideIcon[];
  /** Section 2 feature icons */
  section2Icons: LucideIcon[];
}

export const industryPages: IndustryPageConfig[] = [
  {
    slug: "best-indoor-playground-solution-for-real-estate",
    variable: "Real Estate",
    i18nKey: "realEstate",
    heroIcon: Building2,
    relatedProductSlug: "indoor-playground",
    statsIcons: [TrendingUp, Building2, Users, Star],
    section1Icons: [TrendingUp, Palette, Shield, Building2],
    section2Icons: [Wrench, Target, BarChart3, Zap],
  },
  {
    slug: "pediatric-indoor-playground-solution-for-healthcare",
    variable: "Healthcare",
    i18nKey: "healthcare",
    heroIcon: Heart,
    relatedProductSlug: "soft-play",
    statsIcons: [Heart, Shield, Users, Award],
    section1Icons: [Heart, Shield, Palette, Users],
    section2Icons: [Wrench, Star, BarChart3, Award],
  },
  {
    slug: "educational-indoor-playground-solution-for-schools",
    variable: "Education",
    i18nKey: "education",
    heroIcon: GraduationCap,
    relatedProductSlug: "indoor-playground",
    statsIcons: [GraduationCap, Users, TrendingUp, Shield],
    section1Icons: [GraduationCap, Palette, Shield, Users],
    section2Icons: [Wrench, Target, BarChart3, Clock],
  },
  {
    slug: "ecommerce-retailtainment-indoor-playground-solution",
    variable: "E-commerce",
    i18nKey: "ecommerce",
    heroIcon: ShoppingCart,
    relatedProductSlug: "soft-play",
    statsIcons: [ShoppingCart, TrendingUp, Users, Clock],
    section1Icons: [TrendingUp, Palette, Target, Users],
    section2Icons: [Wrench, Star, BarChart3, ShoppingCart],
  },
  {
    slug: "finance-sector-indoor-playground-solution",
    variable: "Finance",
    i18nKey: "finance",
    heroIcon: Landmark,
    relatedProductSlug: "soft-play",
    statsIcons: [Landmark, Star, Users, Shield],
    section1Icons: [Star, Palette, Shield, Users],
    section2Icons: [Wrench, Target, BarChart3, Landmark],
  },
  {
    slug: "best-indoor-playground-solution-for-legal-offices",
    variable: "Legal",
    i18nKey: "legal",
    heroIcon: Scale,
    relatedProductSlug: "soft-play",
    statsIcons: [Scale, Shield, Users, Star],
    section1Icons: [Star, Shield, Palette, Users],
    section2Icons: [Wrench, Target, BarChart3, Scale],
  },
  {
    slug: "experiential-marketing-indoor-playground-solutions",
    variable: "Marketing",
    i18nKey: "marketing",
    heroIcon: Megaphone,
    relatedProductSlug: "indoor-playground",
    statsIcons: [Megaphone, TrendingUp, Users, Zap],
    section1Icons: [Megaphone, Palette, Target, Users],
    section2Icons: [Wrench, Star, BarChart3, Zap],
  },
  {
    slug: "hr-workplace-wellness-indoor-playground",
    variable: "HR",
    i18nKey: "hr",
    heroIcon: Users,
    relatedProductSlug: "indoor-playground",
    statsIcons: [Users, Heart, TrendingUp, Star],
    section1Icons: [Users, Heart, Shield, Palette],
    section2Icons: [Wrench, Target, BarChart3, Clock],
  },
  {
    slug: "logistics-hub-indoor-playground-solutions",
    variable: "Logistics",
    i18nKey: "logistics",
    heroIcon: Truck,
    relatedProductSlug: "indoor-playground",
    statsIcons: [Truck, Shield, Users, TrendingUp],
    section1Icons: [Truck, Shield, Palette, Users],
    section2Icons: [Wrench, Star, BarChart3, Zap],
  },
  {
    slug: "manufacturing-facility-indoor-playground-safety",
    variable: "Manufacturing",
    i18nKey: "manufacturing",
    heroIcon: Factory,
    relatedProductSlug: "indoor-playground",
    statsIcons: [Factory, Shield, Users, Award],
    section1Icons: [Factory, Shield, Palette, Wrench],
    section2Icons: [Target, Star, BarChart3, Award],
  },
];

export const getIndustryPageBySlug = (slug: string): IndustryPageConfig | undefined =>
  industryPages.find((p) => p.slug === slug);
