import { useState } from "react";
import AdminConsole from "./components/AdminConsole";
import AccessibilityWidget from "./components/AccessibilityWidget";

export default function App() {
  const [lang, setLang] = useState<"en" | "ne">("en");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300">
      {/* Mini Admin Header */}
      <header className="bg-[#0a2540] text-white py-4 shadow-md">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-xl">🛠️</span>
            <div>
              <h1 className="text-sm font-black tracking-tight">Express Engineering</h1>
              <p className="text-[10px] text-blue-200 uppercase tracking-widest">Admin Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center rounded-full bg-white/10 p-0.5 text-xs">
              <button
                onClick={() => setLang("en")}
                className={`rounded-full px-2.5 py-1 font-semibold ${
                  lang === "en" ? "bg-white text-[#0a2540]" : "text-white/85"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ne")}
                className={`rounded-full px-2.5 py-1 font-semibold ${
                  lang === "ne" ? "bg-white text-[#0a2540]" : "text-white/85"
                }`}
              >
                ने
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-6">
        <AdminConsole lang={lang} />
      </main>

      {/* Global Accessibility */}
      <AccessibilityWidget lang={lang} />
    </div>
  );
}
