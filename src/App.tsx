import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Packages from "./components/Packages";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Team from "./components/Team";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import AccessibilityWidget from "./components/AccessibilityWidget";
import ExpressShop from "./components/ExpressShop";
import type { Lang } from "./i18n";

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeTab, setActiveTab] = useState<"home" | "shop">("home");

  useEffect(() => {
    document.body.setAttribute("data-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#fafaf7] text-slate-900 transition-colors duration-300">
      <Navbar lang={lang} setLang={setLang} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className={activeTab !== "home" ? "pt-20" : ""}>
        {activeTab === "home" && (
          <>
            <Hero lang={lang} />
            <Services lang={lang} />
            <Packages lang={lang} />
            <Process lang={lang} />
            <Projects lang={lang} />
            <Testimonials lang={lang} />
            <About lang={lang} />
            <Team lang={lang} />
            <FAQ lang={lang} />
            <Contact lang={lang} />
          </>
        )}

        {activeTab === "shop" && <ExpressShop lang={lang} />}


      </main>

      <Footer lang={lang} setActiveTab={setActiveTab} />
      <FloatingCTA lang={lang} />
      
      {/* Global Accessibility / Disability Features Widget */}
      <AccessibilityWidget lang={lang} />
    </div>
  );
}
