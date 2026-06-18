import { useState } from "react";
import { IconCheck, IconDownload, IconStar, IconShield } from "./Icons";
import type { Lang } from "../i18n";
import { translations } from "../i18n";
import PackageDownloadModal from "./PackageDownloadModal";

type Props = { lang: Lang };

export default function Packages({ lang }: Props) {
  const t = translations[lang].packages;
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleDownload = (key: string) => {
    setSelectedPackage(key);
  };

  return (
    <section
      id="packages"
      className="diagonal-stripes relative overflow-hidden bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a017]" />
            {lang === "en" ? "Download Packages" : "प्याकेज डाउनलोड"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">{t.subheading}</p>
        </div>

        {/* Package Cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.items.map((p) => {
            const popular = "popular" in p && p.popular;
            return (
              <div
                key={p.key}
                className={`group relative flex flex-col rounded-2xl border p-8 transition-all ${
                  popular
                    ? "border-[#0a2540] bg-gradient-to-br from-[#0a2540] via-[#103a5e] to-[#0a2540] text-white shadow-2xl shadow-blue-900/20 lg:-translate-y-4 lg:scale-[1.03]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
                }`}
              >
                {popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#d4a017] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0a2540] shadow-lg">
                      <IconStar className="h-3.5 w-3.5" />
                      {t.labels.mostPopular}
                    </div>
                  </div>
                )}

                <div>
                  <div
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      popular ? "text-amber-300" : "text-[#1e6091]"
                    }`}
                  >
                    {p.tag}
                  </div>
                  <h3
                    className={`mt-2 text-2xl font-bold ${
                      popular ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {p.name}
                  </h3>
                  <div className="mt-5">
                    <div
                      className={`text-[11px] font-medium uppercase tracking-wider ${
                        popular ? "text-blue-200/70" : "text-slate-500"
                      }`}
                    >
                      {p.priceFrom}
                    </div>
                    <div
                      className={`mt-1 text-3xl font-extrabold ${
                        popular ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {p.price}
                    </div>
                  </div>
                </div>

                <div
                  className={`my-6 h-px w-full ${
                    popular ? "bg-white/15" : "bg-slate-200"
                  }`}
                />

                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <span className={popular ? "text-blue-200/80" : ""}>
                    {t.labels.includes}
                  </span>
                </div>

                <ul className="space-y-3">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                          popular
                            ? "bg-amber-400/20 text-amber-300"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        <IconCheck className="h-3.5 w-3.5" />
                      </span>
                      <span className={popular ? "text-blue-100/90" : "text-slate-700"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-2.5">
                  <button
                    onClick={() => handleDownload(p.key)}
                    className={`group/btn inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                      popular
                        ? "bg-[#d4a017] text-[#0a2540] hover:bg-[#c9a227]"
                        : "bg-[#0a2540] text-white hover:bg-[#103a5e]"
                    }`}
                  >
                    <IconDownload className="h-4 w-4" />
                    {t.labels.downloadPdf}
                  </button>
                  <a
                    href="#contact"
                    className={`inline-flex items-center justify-center rounded-lg border px-4 py-3 text-sm font-semibold transition-all ${
                      popular
                        ? "border-white/20 text-white hover:bg-white/10"
                        : "border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    {t.labels.requestCustom}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why packages work */}
        <div className="mt-20">
          <h3 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {t.benefitsTitle}
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.benefits.map((b, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0a2540] text-white">
                  <IconShield className="h-4.5 w-4.5" />
                </div>
                <h4 className="mt-4 text-sm font-bold text-slate-900">{b.title}</h4>
                <p className="mt-1.5 text-sm text-slate-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedPackage && (
        <PackageDownloadModal
          lang={lang}
          isOpen={!!selectedPackage}
          onClose={() => setSelectedPackage(null)}
          packageKey={selectedPackage}
        />
      )}
    </section>
  );
}
