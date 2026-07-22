import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CalendarDays,
  MapPin,
  Ticket,
  Sparkles,
  Download,
  MessageCircle,
  Mail,
  ArrowRight,
  Gift,
  Users,
  Building2,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EEATSignature } from "@/components/EEATSignature";
import invitationLandscape from "@/assets/iaapa-asia-2026-invitation-landscape.jpg";
import invitationPortrait from "@/assets/iaapa-asia-2026-invitation-portrait.jpg";

const EVENT = {
  booth: "2328",
  startISO: "2026-06-10T10:00:00+08:00",
  endISO: "2026-06-12T18:00:00+08:00",
  whatsapp: "18969753002",
};

function useCountdown(targetISO: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(targetISO).getTime() - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff / 3_600_000) % 24);
  const m = Math.floor((diff / 60_000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s, done: diff === 0 };
}

const CountBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-white/30 min-w-[72px] sm:min-w-[92px]">
    <span className="font-heading font-bold text-3xl sm:text-5xl text-white tabular-nums leading-none">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/80 mt-2">
      {label}
    </span>
  </div>
);

export default function IAAPAAsia2026() {
  const { t } = useTranslation();
  const { d, h, m, s } = useCountdown(EVENT.startISO);

  const whatsappUrl = `https://wa.me/${EVENT.whatsapp}?text=${encodeURIComponent(
    t("iaapa.whatsappMsg", "Hi NinescapeLand! I'd like to book a meeting at IAAPA Asia 2026 — Booth 2328."),
  )}`;

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: "IAAPA Asia Tour Exhibition 2026",
    startDate: EVENT.startISO,
    endDate: EVENT.endISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Hong Kong Convention and Exhibition Centre",
      address: { "@type": "PostalAddress", addressLocality: "Hong Kong", addressCountry: "CN" },
    },
    organizer: {
      "@type": "Organization",
      name: "NinescapeLand",
      url: "https://indoorplaygroundsolution.com",
    },
    description: t(
      "iaapa.metaDesc",
      "Visit NinescapeLand at IAAPA Asia 2026 in Hong Kong, Jun 10-12, Booth 2328. Live demos of indoor playgrounds, trampoline parks & gamified attractions.",
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t("iaapa.metaTitle", "IAAPA Asia 2026 Hong Kong · Booth 2328 | NinescapeLand")}</title>
        <meta name="description" content={t("iaapa.metaDesc", "Visit NinescapeLand at IAAPA Asia 2026 in Hong Kong, Jun 10-12, Booth 2328. Live demos of indoor playgrounds, trampoline parks & gamified attractions.")} />
        <meta property="og:title" content={t("iaapa.metaTitle", "NinescapeLand · IAAPA Asia 2026 Booth 2328")} />
        <meta property="og:description" content={t("iaapa.metaDesc", "Hong Kong Convention Centre · June 10-12, 2026 · Booth 2328.")} />
        <meta property="og:image" content={invitationLandscape} />
        <script type="application/ld+json">{JSON.stringify(eventLd)}</script>
      </Helmet>

      <Header />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(20_95%_55%)] via-[hsl(15_90%_50%)] to-[hsl(350_75%_45%)] text-white">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <img src={invitationLandscape} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="container-wide relative z-10 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Badge className="bg-white/20 text-white border-white/40 hover:bg-white/25 backdrop-blur-sm mb-5">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  {t("iaapa.badge", "Official Invitation")}
                </Badge>
                <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-5">
                  {t("iaapa.heroTitle1", "Meet NinescapeLand at")}
                  <span className="block bg-gradient-to-r from-yellow-200 via-amber-100 to-white bg-clip-text text-transparent">
                    {t("iaapa.heroTitle2", "IAAPA Asia 2026")}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-white/90 max-w-xl mb-6">
                  {t("iaapa.heroSub", "Hong Kong Convention & Exhibition Centre · June 10–12, 2026. Step inside our newest gamified FEC concept live on the show floor.")}
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[hsl(15_90%_45%)] font-bold shadow-lg">
                    <Hash className="w-4 h-4" />
                    {t("iaapa.booth", "Booth")} {EVENT.booth}
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm">
                    <CalendarDays className="w-4 h-4" />
                    {t("iaapa.dateLabel", "June 10 – 12, 2026")}
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm">
                    <MapPin className="w-4 h-4" />
                    {t("iaapa.cityShort", "Hong Kong, HKCEC")}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/70 mb-3">
                    {t("iaapa.countdown", "Doors open in")}
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <CountBox value={d} label={t("iaapa.days", "Days")} />
                    <CountBox value={h} label={t("iaapa.hours", "Hours")} />
                    <CountBox value={m} label={t("iaapa.min", "Min")} />
                    <CountBox value={s} label={t("iaapa.sec", "Sec")} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-white text-[hsl(15_90%_45%)] hover:bg-white/90 font-bold shadow-xl">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {t("iaapa.ctaBook", "Book a Booth Meeting")}
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/60 hover:bg-white/10">
                    <a href={invitationPortrait} download="NinescapeLand-IAAPA-Asia-2026-Invitation.jpg">
                      <Download className="w-5 h-5 mr-2" />
                      {t("iaapa.ctaDownload", "Download Invitation")}
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="relative mx-auto max-w-sm lg:max-w-md"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-yellow-300/40 to-pink-300/30 blur-2xl rounded-3xl" />
                <img
                  src={invitationPortrait}
                  alt={t("iaapa.invitationAlt", "NinescapeLand IAAPA Asia 2026 official invitation — Booth 2328")}
                  width={1080}
                  height={1920}
                  loading="eager"
                  fetchPriority="high"
                  className="relative rounded-2xl shadow-2xl border-4 border-white w-full h-auto"
                />
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg rotate-6">
                  {t("iaapa.invitedChip", "INVITED")}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY VISIT */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">{t("iaapa.whyBadge", "What's at Booth 2328")}</Badge>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                {t("iaapa.whyTitle", "Three days. One full-stack FEC blueprint.")}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t("iaapa.whySub", "We're flying in our senior design lead and engineering team so you can pressure-test layouts, materials and ROI numbers face-to-face.")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Building2, key: "card1" },
                { icon: Gift, key: "card2" },
                { icon: Users, key: "card3" },
              ].map((c) => (
                <motion.div
                  key={c.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <c.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2">
                    {t(`iaapa.${c.key}Title`, c.key === "card1" ? "Live 1:1 FEC Walkthrough" : c.key === "card2" ? "Show-Only Pricing" : "Meet the Design Lead")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`iaapa.${c.key}Body`,
                      c.key === "card1"
                        ? "Bring your floorplan — we'll sketch a revenue-optimised layout (trampoline + soft play + ninja + gamified attractions) on the spot."
                        : c.key === "card2"
                        ? "Lock in IAAPA-exclusive package pricing on container-loaded turnkey FECs. Valid only through June 12."
                        : "Greey, our 16-year senior designer (2,000+ builds, 50+ countries), is on-booth for private consultations.")}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LOGISTICS */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container-wide grid lg:grid-cols-2 gap-10 items-center">
            <motion.img
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              src={invitationLandscape}
              alt={t("iaapa.invitationAlt2", "IAAPA Asia 2026 NinescapeLand booth invitation — landscape format")}
              width={1920}
              height={1080}
              loading="lazy"
              className="rounded-2xl shadow-xl w-full h-auto border border-border"
            />
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
                {t("iaapa.planTitle", "Plan your visit")}
              </h2>
              <ul className="space-y-5 text-base">
                <li className="flex gap-4">
                  <Ticket className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <div className="font-bold">{t("iaapa.boothLabel", "Booth Number")}</div>
                    <div className="text-muted-foreground">2328 — {t("iaapa.boothHall", "Main exhibition hall")}</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CalendarDays className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <div className="font-bold">{t("iaapa.datesLabel", "Show Dates")}</div>
                    <div className="text-muted-foreground">{t("iaapa.dateLabel", "June 10 – 12, 2026")} · 10:00 – 18:00 HKT</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <div className="font-bold">{t("iaapa.venueLabel", "Venue")}</div>
                    <div className="text-muted-foreground">
                      {t("iaapa.venueName", "Hong Kong Convention and Exhibition Centre")}<br />
                      {t("iaapa.venueAddr", "1 Expo Drive, Wan Chai, Hong Kong")}
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t("iaapa.ctaWa", "WhatsApp to Reserve a Slot")}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">
                    <Mail className="w-5 h-5 mr-2" />
                    {t("iaapa.ctaEmail", "Send Brief by Email")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <EEATSignature context={t("iaapa.eeatContext", "IAAPA Asia 2026 Hong Kong showcase")} />

        <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              {t("iaapa.finalTitle", "Slots fill fast — book before May 30")}
            </h2>
            <p className="text-primary-foreground/85 text-lg mb-8">
              {t("iaapa.finalSub", "Only 12 private 45-minute consultation slots per day. Reserve yours now and we'll send a calendar invite with your assigned host.")}
            </p>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {t("iaapa.finalCta", "Reserve My Slot")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
