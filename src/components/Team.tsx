import { useEffect, useState } from "react";
import type { Lang } from "../i18n";

type Props = { lang: Lang };

type Engineer = {
  id: number;
  name_en: string;
  name_ne: string;
  role_en: string;
  role_ne: string;
  exp: string;
  spec_en: string;
  spec_ne: string;
  bio_en: string;
  bio_ne: string;
  qualifications_en: string;
  qualifications_ne: string;
  rating: number;
  image: string;
};

export default function Team({ lang }: Props) {
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Engineer | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEngineers = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${API_BASE}/api/engineers`);
      if (!response.ok) throw new Error("Failed to load");
      const data = await response.json();
      setEngineers(data);
    } catch (err) {
      console.error("Error loading engineers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEngineers();
    // Setup listener for updates from admin actions (custom event)
    const handleUpdate = () => fetchEngineers();
    window.addEventListener("engineers-updated", handleUpdate);
    return () => window.removeEventListener("engineers-updated", handleUpdate);
  }, []);

  return (
    <section id="engineers" className="bg-[#fafaf7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a017]" />
            {lang === "en" ? "OUR ENGINEERS" : "हाम्रा इन्जिनियरहरू"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {lang === "en" ? "Meet Our Expert Team" : "हाम्रो विशेषज्ञ टोली"}
          </h2>
          <p className="mt-4 text-base text-slate-600">
            {lang === "en"
              ? "Nepal Engineering Council registered professionals with decades of experience across construction, design, and municipal approvals."
              : "निर्माण, डिजाइन र नगरपालिका स्वीकृतिमा दशकौंको अनुभव भएका नेपाल इन्जिनियरिङ्ग काउन्सिल दर्तावाल पेशेवर।"}
          </p>
        </div>

        {loading ? (
          <div className="mt-12 text-center text-sm font-semibold text-slate-500">
            {lang === "en" ? "Loading team profiles..." : "टोली विवरण लोड हुँदै..."}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {engineers.map((member) => (
              <div
                key={member.id}
                className="group rounded-2xl border border-slate-200 bg-white p-8 text-center transition-all hover:-translate-y-1 hover:border-[#0a2540] hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#0a2540] via-[#1e6091] to-[#0a2540] text-3xl font-bold text-white shadow-inner">
                    {member.image ? member.image[0] : member.name_en[0] || "E"}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {lang === "en" ? member.name_en : member.name_ne}
                  </h3>
                  <div className="mt-1 text-sm font-semibold text-[#1e6091]">
                    {lang === "en" ? member.role_en : member.role_ne}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-amber-500 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                    ★ {member.rating.toFixed(1)} / 5.0
                  </div>
                  <div className="mt-4 text-xs text-slate-500 line-clamp-2">
                    {lang === "en" ? member.spec_en : member.spec_ne}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <div className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-xs font-bold text-emerald-700">
                    {member.exp} {lang === "en" ? "Years Experience" : "वर्ष अनुभव"}
                  </div>
                  <button
                    onClick={() => setSelectedProfile(member)}
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 py-2 text-xs font-bold text-[#0a2540] transition hover:bg-[#0a2540] hover:text-white"
                  >
                    {lang === "en" ? "View Profile & Bio" : "प्रोफाइल र विवरण हेर्नुहोस्"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Engineer Detail Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-fade-up text-slate-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a2540] text-white text-xl font-bold">
                  {selectedProfile.image ? selectedProfile.image[0] : "E"}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-950">
                    {lang === "en" ? selectedProfile.name_en : selectedProfile.name_ne}
                  </h4>
                  <p className="text-xs font-semibold text-[#1e6091]">
                    {lang === "en" ? selectedProfile.role_en : selectedProfile.role_ne}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProfile(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
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

            {/* Modal Content */}
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-150">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">
                    {lang === "en" ? "Experience" : "अनुभव"}
                  </span>
                  <span className="text-sm font-bold text-[#0a2540]">
                    {selectedProfile.exp} {lang === "en" ? "Years Active" : "वर्ष सक्रिय"}
                  </span>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-150">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">
                    {lang === "en" ? "Rating" : "मूल्यांकन"}
                  </span>
                  <span className="text-sm font-bold text-amber-500">
                    ★ {selectedProfile.rating.toFixed(1)} / 5.0
                  </span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  {lang === "en" ? "Specialization" : "विशेषज्ञता"}
                </span>
                <p className="text-xs font-semibold text-slate-800 bg-[#1e6091]/5 border border-[#1e6091]/10 rounded-lg p-2.5">
                  {lang === "en" ? selectedProfile.spec_en : selectedProfile.spec_ne}
                </p>
              </div>

              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  {lang === "en" ? "Qualifications" : "योग्यता र दर्ता"}
                </span>
                <p className="text-xs text-slate-700 bg-emerald-50/50 border border-emerald-100 rounded-lg p-2.5">
                  {lang === "en" ? selectedProfile.qualifications_en : selectedProfile.qualifications_ne}
                </p>
              </div>

              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  {lang === "en" ? "Biography" : "जीवनी"}
                </span>
                <p className="text-xs leading-relaxed text-slate-600 bg-slate-50/50 rounded-lg p-3 border border-slate-100">
                  {lang === "en" ? selectedProfile.bio_en : selectedProfile.bio_ne}
                </p>
              </div>
            </div>

            {/* Close Actions */}
            <div className="mt-6 border-t border-slate-100 pt-4 text-right">
              <button
                onClick={() => setSelectedProfile(null)}
                className="rounded-lg bg-[#0a2540] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#1e6091]"
              >
                {lang === "en" ? "Close Profile" : "प्रोफाइल बन्द गर्नुहोस्"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
