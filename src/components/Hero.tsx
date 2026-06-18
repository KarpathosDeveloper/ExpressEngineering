import { IconArrow, IconShield, IconCheck, IconDownload } from "./Icons";
import type { Lang } from "../i18n";
import { translations } from "../i18n";

type Props = { lang: Lang };

export default function Hero({ lang }: Props) {
  const t = translations[lang].hero;

  return (
    <section
      id="home"
      className="gradient-bg-hero relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-28"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
      {/* Glowing orbs */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-12 lg:px-8">
        {/* Left content */}
        <div className="lg:col-span-7">
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-blue-100 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4a017]" />
            </span>
            {t.badge}
          </div>

          <h1 className="fade-up mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {t.title1}
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              {t.title2}
            </span>
            <br />
            {t.title3}
          </h1>

          <p className="fade-up mt-6 max-w-2xl text-base leading-relaxed text-blue-100/90 sm:text-lg">
            {t.subtitle}
          </p>

          <div className="fade-up mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#packages"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#d4a017] px-5 py-3.5 text-sm font-semibold text-[#0a2540] shadow-lg shadow-amber-500/30 transition-all hover:bg-[#c9a227] hover:shadow-xl hover:shadow-amber-500/40"
            >
              <IconDownload className="h-4.5 w-4.5" />
              {t.cta1}
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              {t.cta2}
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Trust strip */}
          <div className="fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-blue-100/70">
            <div className="flex items-center gap-1.5">
              <IconShield className="h-4 w-4 text-amber-300" />
              <span>NEC Registered</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-blue-300/40" />
            <div className="flex items-center gap-1.5">
              <IconCheck className="h-4 w-4 text-amber-300" />
              <span>ISO 9001:2015 Certified</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-blue-300/40" />
            <div className="flex items-center gap-1.5">
              <IconCheck className="h-4 w-4 text-amber-300" />
              <span>Pan-Nepal Delivery</span>
            </div>
          </div>
        </div>

        {/* Right - Stats Card */}
        <div className="lg:col-span-5">
          <div className="relative">
            {/* Floating accent card */}
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 opacity-20 blur-2xl" />

            <div className="relative float-anim rounded-2xl border border-white/15 bg-white/[0.07] p-7 backdrop-blur-md">
              <div className="grid grid-cols-2 gap-5">
                {t.stats.map((s, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-5 ${
                      i === 0 || i === 3
                        ? "bg-gradient-to-br from-white/10 to-white/0"
                        : "bg-white/5"
                    }`}
                  >
                    <div className="text-3xl font-extrabold text-white sm:text-4xl">{s.value}</div>
                    <div className="mt-1 text-xs font-medium text-blue-100/80">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d4a017]/20 text-[#d4a017]">
                    <IconShield className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {lang === "en" ? "Trusted by 1200+ clients" : "१२००+ ग्राहकको विश्वास"}
                    </div>
                    <div className="text-xs text-blue-100/70">
                      {lang === "en" ? "Across all 7 provinces of Nepal" : "नेपालका सबै ७ प्रदेशमा"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="pointer-events-none absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="block w-full">
          <path
            d="M0 30 Q360 0 720 30 T1440 30 V60 H0 Z"
            fill="#fafaf7"
          />
        </svg>
      </div>
    </section>
  );
}
