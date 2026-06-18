import { IconQuote, IconStar } from "./Icons";
import type { Lang } from "../i18n";
import { translations } from "../i18n";

type Props = { lang: Lang };

export default function Testimonials({ lang }: Props) {
  const t = translations[lang].testimonials;

  return (
    <section className="bg-[#0a2540] py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a017]" />
            {lang === "en" ? "Testimonials" : "प्रशंसापत्र"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-base text-blue-100/80 sm:text-lg">{t.subheading}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.items.map((tm, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.06]"
            >
              <IconQuote className="h-10 w-10 text-[#d4a017]/40" />
              <p className="mt-4 text-sm leading-relaxed text-blue-50/90 sm:text-base">
                "{tm.quote}"
              </p>
              <div className="mt-6 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, j) => (
                  <IconStar key={j} className="h-4 w-4" />
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a017] to-amber-600 text-base font-bold text-white">
                  {tm.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{tm.name}</div>
                  <div className="text-xs text-blue-200/70">{tm.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
