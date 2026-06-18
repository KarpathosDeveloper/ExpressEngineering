import {
  IconBuilding,
  IconMaterials,
  IconMunicipal,
  IconInterior,
  IconFurniture,
  IconBundle,
  IconArrow,
} from "./Icons";
import type { Lang } from "../i18n";
import { translations } from "../i18n";

const iconMap = {
  construction: IconBuilding,
  materials: IconMaterials,
  municipal: IconMunicipal,
  interior: IconInterior,
  furniture: IconFurniture,
  bundle: IconBundle,
};

type Props = { lang: Lang };

export default function Services({ lang }: Props) {
  const t = translations[lang].services;

  return (
    <section id="services" className="bg-[#fafaf7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a017]" />
            {lang === "en" ? "Our Services" : "हाम्रा सेवाहरू"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">{t.subheading}</p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((s) => {
            const Icon = iconMap[s.key as keyof typeof iconMap];
            const featured = s.key === "bundle";
            return (
              <div
                key={s.key}
                className={`group relative overflow-hidden rounded-2xl border p-7 transition-all hover:-translate-y-1 hover:shadow-xl ${
                  featured
                    ? "border-[#0a2540] bg-gradient-to-br from-[#0a2540] to-[#103a5e] text-white"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {featured && (
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-400/10 blur-2xl" />
                )}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                    featured
                      ? "bg-[#d4a017] text-[#0a2540]"
                      : "bg-slate-100 text-[#0a2540] group-hover:bg-[#0a2540] group-hover:text-white"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3
                  className={`mt-5 text-lg font-bold ${
                    featured ? "text-white" : "text-slate-900"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    featured ? "text-blue-100/85" : "text-slate-600"
                  }`}
                >
                  {s.desc}
                </p>
                <a
                  href="#packages"
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all ${
                    featured
                      ? "text-[#d4a017] hover:gap-2.5"
                      : "text-[#1e6091] hover:gap-2.5"
                  }`}
                >
                  {lang === "en" ? "Explore" : "अन्वेषण गर्नुहोस्"}
                  <IconArrow className="h-3.5 w-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
