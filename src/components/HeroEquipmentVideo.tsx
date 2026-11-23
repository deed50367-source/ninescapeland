import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import equipmentVideo from "@/assets/equipment-hero.mp4.asset.json";

const labels: Record<string, { play: string; pause: string }> = {
  en: { play: "Play equipment video", pause: "Pause equipment video" },
  ar: { play: "تشغيل فيديو المعدات", pause: "إيقاف فيديو المعدات مؤقتًا" },
  de: { play: "Anlagenvideo abspielen", pause: "Anlagenvideo pausieren" },
  es: { play: "Reproducir vídeo del equipo", pause: "Pausar vídeo del equipo" },
  pt: { play: "Reproduzir vídeo do equipamento", pause: "Pausar vídeo do equipamento" },
  fr: { play: "Lire la vidéo des équipements", pause: "Mettre la vidéo en pause" },
};

/** One silent push-in, with the existing image always available underneath. */
export function HeroEquipmentVideo() {
  const { i18n } = useTranslation();
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const requested = useRef(true);
  const visible = useRef(true);
  const text = labels[i18n.language.split("-")[0]] ?? labels.en;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!enabled || !element) return;
    const sync = () => {
      if (requested.current && visible.current && !document.hidden) {
        void element.play().catch(() => setPlaying(false));
      } else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      element.pause();
    };
  }, [enabled]);

  if (!enabled || failed) return null;
  return <>
    <video
      ref={video}
      src={equipmentVideo.url}
      className={`home-hero-image absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
      muted playsInline autoPlay preload="metadata" aria-hidden="true" tabIndex={-1}
      onLoadedData={() => setReady(true)}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => { requested.current = false; setPlaying(false); }}
      onError={() => setFailed(true)}
    />
    <Button
      variant="secondary" size="icon"
      className="absolute end-4 top-4 z-20 h-11 w-11 border border-border shadow-soft"
      aria-label={playing ? text.pause : text.play}
      title={playing ? text.pause : text.play}
      onClick={() => {
        const element = video.current;
        if (!element) return;
        requested.current = !playing;
        if (playing) element.pause();
        else {
          if (element.ended) element.currentTime = 0;
          void element.play().catch(() => setPlaying(false));
        }
      }}
    >
      {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
    </Button>
  </>;
}