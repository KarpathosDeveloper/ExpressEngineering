import { useState, type FormEvent } from "react";
import { IconLogo, IconArrow, IconMapPin, IconPhone, IconMail } from "./Icons";
import type { Lang } from "../i18n";
import { translations } from "../i18n";

type Props = {
  lang: Lang;
  setActiveTab: (t: "home" | "shop") => void;
};

export default function Footer({ lang, setActiveTab }: Props) {
  const t = translations[lang].footer;
  const tNav = translations[lang].nav;
  const tServices = translations[lang].services;

  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSub = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 3000);
  };

  const handleNavClick = (tab: "home" | "shop", anchor?: string) => {
    setActiveTab(tab);
    if (tab === "home" && anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0a2540] text-blue-100">
      {/* Top - CTA strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {lang === "en"
                  ? "Ready to build? Let's talk."
                  : "निर्माण गर्न तयार? कुरा गरौं।"}
              </h3>
              <p className="mt-1.5 text-sm text-blue-200/80">
                {lang === "en"
                  ? "Pan-Nepal delivery. Bundle or de-bundle. Engineering-grade quality."
                  : "प्यान-नेपाल डेलिभरी। बण्डल वा डि-बण्डल। इन्जिनियरिङ्ग-स्तरको गुणस्तर।"}
              </p>
            </div>
            <button
              onClick={() => handleNavClick("home", "contact")}
              className="group inline-flex items-center gap-2 rounded-lg bg-[#d4a017] px-5 py-3 text-sm font-semibold text-[#0a2540] shadow-md shadow-amber-500/20 transition-all hover:bg-[#c9a227] hover:shadow-lg border-0 cursor-pointer"
            >
              {tNav.cta}
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 text-left bg-transparent border-0 cursor-pointer p-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1e6091] to-[#d4a017] text-white shadow-md">
                <IconLogo className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="text-base font-bold text-white">Express Engineering</div>
                <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-blue-200/70">
                  Consultancy
                </div>
              </div>
            </button>
            <p className="mt-4 max-w-sm text-sm text-blue-200/75">{t.tagline}</p>

            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-200/70">
                {t.newsletter}
              </div>
              <form onSubmit={handleSub} className="mt-2.5 flex max-w-sm overflow-hidden rounded-lg border border-white/15 bg-white/5 backdrop-blur-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.yourEmail}
                  className="flex-1 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder-blue-200/50 outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#d4a017] px-4 text-sm font-semibold text-[#0a2540] transition hover:bg-[#c9a227]"
                >
                  {done ? "✓" : t.subscribe}
                </button>
              </form>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-200/70">
              {t.quickLinks}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNavClick("home")} className="text-blue-100/80 transition-colors hover:text-white bg-transparent border-0 cursor-pointer p-0 text-left">
                  {lang === "en" ? "Home" : "गृहपृष्ठ"}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("home", "services")} className="text-blue-100/80 transition-colors hover:text-white bg-transparent border-0 cursor-pointer p-0 text-left">
                  {tNav.services}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("home", "packages")} className="text-blue-100/80 transition-colors hover:text-white bg-transparent border-0 cursor-pointer p-0 text-left">
                  {tNav.packages}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("home", "what-we-do")} className="text-blue-100/80 transition-colors hover:text-white bg-transparent border-0 cursor-pointer p-0 text-left">
                  {lang === "en" ? "What We Do" : "हाम्रो कार्यक्षेत्र"}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("shop")} className="text-blue-100/80 transition-colors hover:text-white bg-transparent border-0 cursor-pointer p-0 text-left">
                  {lang === "en" ? "Express Shop" : "एक्सप्रेस शप"}
                </button>
              </li>

            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-200/70">
              {t.services}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {tServices.items.slice(0, 5).map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() => handleNavClick("home", "services")}
                    className="text-blue-100/80 transition-colors hover:text-white bg-transparent border-0 cursor-pointer p-0 text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-200/70">
              {t.contact}
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <IconMapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a017]" />
                <span className="text-blue-100/85">New Baneshwor, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconPhone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a017]" />
                <a href="tel:+9779810555494" className="text-blue-100/85 hover:text-white">
                  +977-9810555494
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconMail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a017]" />
                <a
                  href="mailto:info@expresseng.com.np"
                  className="text-blue-100/85 hover:text-white"
                >
                  info@expresseng.com.np
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div className="text-xs text-blue-200/60">
            © {new Date().getFullYear()} Express Engineering Consultancy. {t.rights}
          </div>
          <div className="flex items-center gap-5 text-xs text-blue-200/70">
            <a href="#" className="hover:text-white">
              {t.privacy}
            </a>
            <span className="h-1 w-1 rounded-full bg-blue-300/30" />
            <a href="#" className="hover:text-white">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
