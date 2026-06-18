import { IconPhone, IconWhatsApp } from "./Icons";
import type { Lang } from "../i18n";

type Props = { lang: Lang };

export default function FloatingCTA({ lang }: Props) {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3 lg:bottom-8 lg:right-8">
      <a
        href="https://wa.me/9779810555494"
        target="_blank"
        rel="noreferrer"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 transition-all hover:bg-emerald-700 hover:shadow-xl active:scale-95"
        aria-label="WhatsApp"
      >
        <IconWhatsApp className="h-6 w-6" />
      </a>
      <a
        href="tel:+9779810555494"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#0a2540] text-white shadow-lg shadow-[#0a2540]/40 transition-all hover:bg-[#1e6091] hover:shadow-xl active:scale-95"
        aria-label="Call"
      >
        <IconPhone className="h-5 w-5" />
      </a>
      <div className="rounded-full bg-gradient-to-r from-[#d4a017] to-amber-600 px-4 py-2 text-center text-[10px] font-bold tracking-wider text-[#0a2540] shadow-lg">
        {lang === "en" ? "24hr Response" : "२४ घण्टा प्रतिक्रिया"}
      </div>
    </div>
  );
}
