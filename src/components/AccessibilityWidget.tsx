import { useState, useEffect } from "react";
import type { Lang } from "../i18n";

type Props = {
  lang: Lang;
};

export default function AccessibilityWidget({ lang }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [textScale, setTextScale] = useState(1); // 1 to 5
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [largeCursor, setLargeCursor] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  // Apply styles to document.body
  useEffect(() => {
    // 1. Text Scale
    const body = document.body;
    body.classList.forEach((cls) => {
      if (cls.startsWith("text-scale-")) {
        body.classList.remove(cls);
      }
    });
    body.classList.add(`text-scale-${textScale}`);
  }, [textScale]);

  useEffect(() => {
    // 2. High Contrast
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);

  useEffect(() => {
    // 3. Dyslexia Font
    if (dyslexiaFont) {
      document.body.classList.add("dyslexia-font");
    } else {
      document.body.classList.remove("dyslexia-font");
    }
  }, [dyslexiaFont]);

  useEffect(() => {
    // 4. Underline Links
    if (underlineLinks) {
      document.body.classList.add("underline-links");
    } else {
      document.body.classList.remove("underline-links");
    }
  }, [underlineLinks]);

  useEffect(() => {
    // 5. Large Cursor
    if (largeCursor) {
      document.body.classList.add("large-cursor");
    } else {
      document.body.classList.remove("large-cursor");
    }
  }, [largeCursor]);

  const speakText = (text: string, currentLang: Lang) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (currentLang === "ne") {
      utterance.lang = "ne-NP";
      const voices = window.speechSynthesis.getVoices();
      const nepaliVoice = voices.find(
        (v) => v.lang.startsWith("ne") || v.lang.includes("ne-NP")
      );
      const hindiVoice = voices.find(
        (v) => v.lang.startsWith("hi") || v.lang.includes("hi-IN")
      );
      if (nepaliVoice) {
        utterance.voice = nepaliVoice;
      } else if (hindiVoice) {
        utterance.voice = hindiVoice;
      }
    } else {
      utterance.lang = "en-US";
    }
    window.speechSynthesis.speak(utterance);
  };

  // Click listener for Text to Speech
  useEffect(() => {
    if (!ttsEnabled) return;

    const handleTextClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "P" ||
        target.tagName === "H1" ||
        target.tagName === "H2" ||
        target.tagName === "H3" ||
        target.tagName === "H4" ||
        target.tagName === "SPAN" ||
        target.tagName === "LI"
      ) {
        e.preventDefault();
        e.stopPropagation();
        
        const textToSpeak = target.innerText || target.getAttribute("aria-label") || "";
        if (textToSpeak.trim()) {
          speakText(textToSpeak, lang);
          
          // Flash element to show it is being read
          target.style.outline = "2px solid #d4a017";
          setTimeout(() => {
            target.style.outline = "";
          }, 1500);
        }
      }
    };

    document.addEventListener("click", handleTextClick, true);
    return () => {
      document.removeEventListener("click", handleTextClick, true);
    };
  }, [ttsEnabled, lang]);

  const resetAll = () => {
    setTextScale(1);
    setHighContrast(false);
    setDyslexiaFont(false);
    setUnderlineLinks(false);
    setLargeCursor(false);
    setTtsEnabled(false);
    window.speechSynthesis.cancel();
  };

  const speakWelcome = () => {
    const welcomeText =
      lang === "en"
        ? "Accessibility menu opened. Please select your options."
        : "पहुँचयोग्यता मेनु खोलियो। कृपया आफ्नो विकल्पहरू चयन गर्नुहोस्।";
    speakText(welcomeText, lang);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(speakWelcome, 300);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      {/* Floating Accessibility Trigger Button */}
      <button
        onClick={toggleMenu}
        className="fixed bottom-6 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#1e6091] text-white shadow-lg shadow-[#1e6091]/30 transition-all hover:bg-[#0a2540] hover:scale-105 active:scale-95 border-2 border-white"
        aria-label={lang === "en" ? "Accessibility Features" : "पहुँचयोग्यता सुविधाहरू"}
        title={lang === "en" ? "Accessibility Features" : "पहुँचयोग्यता सुविधाहरू"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <circle cx="12" cy="5" r="1" />
          <path d="m9 20 1-5h4l1 5" />
          <path d="M9.5 8.5h5" />
          <path d="M12 6v6" />
          <path d="m6 10 6-1 6 1" />
        </svg>
      </button>

      {/* Accessibility Controls Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-start bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-fade-up text-slate-900 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a2540] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-base font-bold">
                  {lang === "en" ? "Accessibility Settings" : "पहुँचयोग्यता सेटिङ्गहरू"}
                </h3>
              </div>
              <button
                onClick={toggleMenu}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Controls List */}
            <div className="mt-5 space-y-5">
              {/* 1. Text Sizing Slider */}
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span id="text-scale-label">{lang === "en" ? "Adjust Text Size" : "अक्षरको आकार मिलाउनुहोस्"}</span>
                  <span className="text-xs text-slate-500">
                    {textScale === 1 ? "100%" : `${100 + (textScale - 1) * 12.5}%`}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center gap-3">
                  <span className="text-xs text-slate-400" aria-hidden="true">A</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={textScale}
                    aria-labelledby="text-scale-label"
                    aria-valuemin={1}
                    aria-valuemax={5}
                    aria-valuenow={textScale}
                    onChange={(e) => setTextScale(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer rounded-lg bg-slate-200 accent-[#1e6091]"
                  />
                  <span className="text-lg font-bold text-slate-700" aria-hidden="true">A+</span>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* 2. Text to Speech / Screen Reader */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-800">
                    {lang === "en" ? "Screen Reader (TTS)" : "स्क्रिन रिडर (TTS)"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {lang === "en"
                      ? "Click any text block to hear it read aloud."
                      : "कुनै पनि पाठ ब्लकमा क्लिक गर्नुहोस् र यसलाई ठूलो स्वरमा सुन्नुहोस्।"}
                  </div>
                </div>
                <button
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  role="switch"
                  aria-checked={ttsEnabled}
                  aria-label={lang === "en" ? "Toggle Screen Reader Text to Speech" : "स्क्रिन रिडर पाठ-वाचन टगल गर्नुहोस्"}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    ttsEnabled ? "bg-emerald-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      ttsEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* 3. High Contrast Display */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-800">
                    {lang === "en" ? "High Contrast Mode" : "उच्च कन्ट्रास्ट मोड"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {lang === "en"
                      ? "Switches display to high visibility yellow-on-black."
                      : "प्रदर्शनलाई उच्च दृश्यता पहेँलो-कालो मोडमा बदल्छ।"}
                  </div>
                </div>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  role="switch"
                  aria-checked={highContrast}
                  aria-label={lang === "en" ? "Toggle High Contrast Display" : "उच्च कन्ट्रास्ट प्रदर्शन टगल गर्नुहोस्"}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    highContrast ? "bg-emerald-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      highContrast ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* 4. Dyslexia Legible Font */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-800">
                    {lang === "en" ? "Dyslexia Friendly Font" : "डिस्लेक्सिया अनुकूल फन्ट"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {lang === "en"
                      ? "Switches page text to dyslexia-optimized typeface."
                      : "पृष्ठको पाठलाई डिस्लेक्सिया-अनुकूल फन्टमा बदल्छ।"}
                  </div>
                </div>
                <button
                  onClick={() => setDyslexiaFont(!dyslexiaFont)}
                  role="switch"
                  aria-checked={dyslexiaFont}
                  aria-label={lang === "en" ? "Toggle Dyslexia Readable Font" : "डिस्लेक्सिया अनुकूल फन्ट टगल गर्नुहोस्"}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    dyslexiaFont ? "bg-emerald-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      dyslexiaFont ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* 5. Underline Hyperlinks */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-800">
                    {lang === "en" ? "Underline All Links" : "सबै लिङ्कहरू अन्डरलाइन गर्नुहोस्"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {lang === "en"
                      ? "Highlights links with bold outlines and underlines."
                      : "लिङ्कहरूलाई बोल्ड आउटलाइन र अन्डरलाइनको साथ हाइलाइट गर्दछ।"}
                  </div>
                </div>
                <button
                  onClick={() => setUnderlineLinks(!underlineLinks)}
                  role="switch"
                  aria-checked={underlineLinks}
                  aria-label={lang === "en" ? "Toggle Hyperlink Underlines" : "सबै लिङ्कहरू अन्डरलाइन टगल गर्नुहोस्"}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    underlineLinks ? "bg-emerald-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      underlineLinks ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* 6. High Visibility Large Cursor */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-800">
                    {lang === "en" ? "Large Contrast Cursor" : "ठूलो कन्ट्रास्ट कर्सर"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {lang === "en"
                      ? "Increases mouse cursor size with a white border outline."
                      : "सेतो किनारा आउटलाइनको साथ माउस कर्सरको आकार बढाउँछ।"}
                  </div>
                </div>
                <button
                  onClick={() => setLargeCursor(!largeCursor)}
                  role="switch"
                  aria-checked={largeCursor}
                  aria-label={lang === "en" ? "Toggle Large High-Visibility Cursor" : "ठूलो कर्सर आकार टगल गर्नुहोस्"}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    largeCursor ? "bg-emerald-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      largeCursor ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={resetAll}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
              >
                {lang === "en" ? "Reset Settings" : "सेटिङ्गहरू रिसेट गर्नुहोस्"}
              </button>
              <button
                onClick={toggleMenu}
                className="w-full rounded-lg bg-[#0a2540] py-2.5 text-xs font-semibold text-white transition hover:bg-[#1e6091]"
              >
                {lang === "en" ? "Apply & Close" : "लागू गर्नुहोस् र बन्द गर्नुहोस्"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
