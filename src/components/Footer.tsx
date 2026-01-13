import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, Instagram } from "lucide-react";
import { useRTL } from "@/hooks/useRTL";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import logo from "@/assets/logo.png";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61552140959757vNSFQ", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCIdoa0CaYjica6C0PIvNSFQ", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export const Footer = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const { localizedPath } = useLocalizedPath();

  const productLinks = [
    { label: t("footer.links.indoorPlayground"), href: localizedPath("/products") },
    { label: t("footer.links.trampolinePark"), href: localizedPath("/products") },
    { label: t("footer.links.ninjaCourse"), href: localizedPath("/products") },
    { label: t("footer.links.softPlay"), href: localizedPath("/products") },
    { label: t("footer.links.customDesign"), href: localizedPath("/contact") },
  ];

  const companyLinks = [
    { label: t("footer.links.aboutUs"), href: localizedPath("/about") },
    { label: t("footer.links.projects"), href: localizedPath("/projects") },
    { label: t("footer.links.certifications"), href: localizedPath("/about") },
    { label: t("footer.links.faq"), href: localizedPath("/faq") },
    { label: t("footer.links.contact"), href: localizedPath("/contact") },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <img src={logo} alt="NinescapeLand" className="h-20 w-auto max-w-[260px] mb-6 brightness-0 invert" />
            <p className="text-primary-foreground/80 mb-6">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">{t("footer.products")}</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">{t("footer.contactUs")}</h4>
            <ul className="space-y-4">
              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/60 text-sm">{t("footer.contact.phone")}</p>
                  <a href="tel:+8615057582901" className="hover:opacity-80" dir="ltr">
                    +86 150 5758 2901
                  </a>
                </div>
              </li>
              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/60 text-sm">{t("footer.contact.email")}</p>
                  <a href="mailto:sale@indoorplaygroundsolution.com" className="hover:opacity-80" dir="ltr">
                    sale@indoorplaygroundsolution.com
                  </a>
                </div>
              </li>
              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/60 text-sm">{t("footer.contact.factory")}</p>
                  <span>Wenzhou, Zhejiang, China</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-wide py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
