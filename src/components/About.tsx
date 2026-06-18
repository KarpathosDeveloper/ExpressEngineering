import { IconCheck } from "./Icons";
import type { Lang } from "../i18n";
import { translations } from "../i18n";

type Props = { lang: Lang };

export default function About({ lang }: Props) {
  const t = translations[lang].about;

  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left - Story */}
          <div className="lg:col-span-7">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4a017]" />
              {lang === "en" ? "About Us" : "हाम्रो बारेमा"}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {t.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">{t.lead}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{t.body}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {t.points.map((p, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-slate-700">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Mission / Vision */}
          <div className="space-y-5 lg:col-span-5">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[#0a2540] to-[#1e6091] p-7 text-white">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-400/10 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-300">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  {t.mission.title}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-blue-50/90 sm:text-base">
                  {t.mission.text}
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50 p-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-200/60 px-3 py-1 text-xs font-semibold text-amber-900">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {t.vision.title}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-amber-950/80 sm:text-base">
                {t.vision.text}
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: "1200+", l: lang === "en" ? "Projects" : "आयोजना" },
                { v: "All 7", l: lang === "en" ? "Provinces" : "प्रदेश" },
                { v: "18+", l: lang === "en" ? "Years" : "वर्ष" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-center"
                >
                  <div className="text-2xl font-extrabold text-[#0a2540]">{s.v}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
