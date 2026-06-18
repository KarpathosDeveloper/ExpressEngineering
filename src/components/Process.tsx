import type { Lang } from "../i18n";
import { translations } from "../i18n";

type Props = { lang: Lang };

export default function Process({ lang }: Props) {
  const t = translations[lang].process;

  return (
    <section id="process" className="bg-[#fafaf7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a017]" />
            {lang === "en" ? "Our Process" : "हाम्रो प्रक्रिया"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">{t.subheading}</p>
        </div>

        <div className="relative mt-14">
          {/* Connector line */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((s) => (
              <div
                key={s.no}
                className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="absolute -top-3 left-7 inline-flex h-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#0a2540] to-[#1e6091] px-3 text-xs font-bold text-white shadow-md">
                  {s.no}
                </div>
                <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-[#d4a017] transition-all group-hover:bg-[#d4a017] group-hover:text-white">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
