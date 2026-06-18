import { useState, useEffect } from "react";
import { IconLogo, IconArrow } from "./Icons";
import type { Lang } from "../i18n";
import { translations } from "../i18n";

type Props = {
  lang: Lang;
  setLang: (l: Lang) => void;
  activeTab: "home" | "shop";
  setActiveTab: (t: "home" | "shop") => void;
};

export default function Navbar({ lang, setLang, activeTab, setActiveTab }: Props) {
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", label: lang === "en" ? "Home" : "गृहपृष्ठ", type: "tab" },
    { id: "services", label: t.nav.services, type: "anchor" },
    { id: "packages", label: t.nav.packages, type: "anchor" },
    { id: "what-we-do", label: lang === "en" ? "What We Do" : "हाम्रो कार्यक्षेत्र", type: "anchor" },
    { id: "shop", label: lang === "en" ? "Express Shop" : "एक्सप्रेस शप", type: "tab" },
  ];

  const showScrolledNavbar = scrolled || activeTab !== "home";

  const handleLinkClick = (id: string, type: string) => {
    setOpen(false);
    if (type === "tab") {
      setActiveTab(id as any);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveTab("home");
      // Let the browser handle standard anchor navigation, but delay slightly if transitioning tabs
      if (activeTab !== "home") {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showScrolledNavbar
          ? "bg-white/85 backdrop-blur-xl shadow-sm border-b border-slate-200/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick("home", "tab")}
          className="group flex items-center gap-3 text-left bg-transparent border-0 cursor-pointer p-0"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0a2540] to-[#1e6091] text-white shadow-md shadow-blue-900/20">
            <IconLogo className="h-5 w-5" />
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#d4a017] ring-2 ring-white" />
          </div>
          <div className="leading-tight">
            <div className={`text-[15px] font-bold tracking-tight ${showScrolledNavbar ? "text-slate-900" : "text-white"}`}>
              Express Engineering
            </div>
            <div className={`text-[10.5px] font-medium uppercase tracking-[0.18em] ${showScrolledNavbar ? "text-slate-500" : "text-blue-200"}`}>
              Consultancy
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const isTabActive = activeTab === l.id;
            return (
              <a
                key={l.id}
                href={l.type === "anchor" ? `#${l.id}` : undefined}
                onClick={(e) => {
                  if (l.type === "tab") e.preventDefault();
                  handleLinkClick(l.id, l.type);
                }}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer select-none ${
                  showScrolledNavbar
                    ? isTabActive
                      ? "bg-[#0a2540] text-white font-bold"
                      : "text-slate-700 hover:text-[#0a2540] hover:bg-slate-100/70"
                    : isTabActive
                    ? "bg-white/25 text-white font-bold"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className={`hidden items-center rounded-full p-0.5 sm:flex ${showScrolledNavbar ? "bg-slate-100" : "bg-white/15 backdrop-blur"}`}>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                lang === "en"
                  ? "bg-white text-[#0a2540] shadow-sm font-bold"
                  : showScrolledNavbar
                  ? "text-slate-500 hover:text-slate-700"
                  : "text-white/80 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ne")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                lang === "ne"
                  ? "bg-white text-[#0a2540] shadow-sm font-bold"
                  : showScrolledNavbar
                  ? "text-slate-500 hover:text-slate-700"
                  : "text-white/80 hover:text-white"
              }`}
            >
              ने
            </button>
          </div>

          {/* CTA */}
          <button
            onClick={() => handleLinkClick("contact", "anchor")}
            className="group hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#d4a017] to-[#c9a227] px-4 py-2.5 text-sm font-semibold text-[#0a2540] shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/30 sm:inline-flex border-0 cursor-pointer"
          >
            {t.nav.cta}
            <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className={`ml-1 inline-flex h-10 w-10 items-center justify-center rounded-lg lg:hidden ${
              showScrolledNavbar ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200/60 bg-white/95 backdrop-blur-xl lg:hidden">
          <div className="space-y-1 px-5 py-3">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.type === "anchor" ? `#${l.id}` : undefined}
                onClick={(e) => {
                  if (l.type === "tab") e.preventDefault();
                  handleLinkClick(l.id, l.type);
                }}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  activeTab === l.id ? "bg-[#0a2540] text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="flex items-center rounded-full bg-slate-100 p-0.5">
                <button
                  onClick={() => setLang("en")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    lang === "en" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("ne")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    lang === "ne" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                  }`}
                >
                  ने
                </button>
              </div>
            </div>
            <button
              onClick={() => handleLinkClick("contact", "anchor")}
              className="mt-2 block w-full rounded-lg bg-gradient-to-r from-[#d4a017] to-[#c9a227] px-4 py-2.5 text-center text-sm font-semibold text-[#0a2540] border-0 cursor-pointer"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
