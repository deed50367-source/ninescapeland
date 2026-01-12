import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, Instagram } from "lucide-react";

const productLinks = [
  { label: "Indoor Playground Equipment", href: "#products" },
  { label: "Trampoline Park Equipment", href: "#products" },
  { label: "Ninja Warrior Course", href: "#products" },
  { label: "Soft Play Equipment", href: "#products" },
  { label: "Custom Design Service", href: "#contact" },
];

const companyLinks = [
  { label: "About Us", href: "#why-us" },
  { label: "Our Projects", href: "#projects" },
  { label: "Certifications", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61552140959757vNSFQ", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCIdoa0CaYjica6C0PIvNSFQ", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-heading font-bold mb-4">NinescapeLand</h3>
            <p className="text-primary-foreground/80 mb-6">
              Professional manufacturer of commercial indoor playground equipment, trampoline parks, 
              ninja courses and family entertainment center solutions. Serving clients worldwide since 2008.
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
            <h4 className="font-heading font-bold text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/60 text-sm">Phone / WhatsApp</p>
                  <a href="tel:+8615057582901" className="hover:opacity-80">
                    +86 150 5758 2901
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/60 text-sm">Email</p>
                  <a href="mailto:NinescapeLand@gmail.com" className="hover:opacity-80">
                    NinescapeLand@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/60 text-sm">Factory</p>
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
          <p>© 2024 NinescapeLand. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
