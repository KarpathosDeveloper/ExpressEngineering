import { useState } from "react";
import { jsPDF } from "jspdf";
import SignaturePad from "./SignaturePad";
import type { Lang } from "../i18n";
import { translations } from "../i18n";

type Props = {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
  packageKey: string;
};

export default function PackageDownloadModal({ lang, isOpen, onClose, packageKey }: Props) {
  const t = translations[lang].packages;
  const pkg = t.items.find((p) => p.key === packageKey);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [signatureImage, setSignatureImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !pkg) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert(lang === "en" ? "Please fill all fields" : "कृपया सबै विवरणहरू भर्नुहोस्");
      return;
    }
    if (!signatureImage) {
      alert(lang === "en" ? "Please sign the agreement" : "कृपया सम्झौतामा हस्ताक्षर गर्नुहोस्");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Generate PDF using jsPDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Branding Header
      doc.setFillColor(10, 37, 64); // #0a2540
      doc.rect(0, 0, 210, 40, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("EXPRESS ENGINEERING CONSULTANCY", 15, 18);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("An ISO 9001:2015 Quality Management Certified Company", 15, 26);
      doc.text("New Baneshwor, Kathmandu, Nepal | info@expresseng.com.np", 15, 32);

      // Document Title
      doc.setTextColor(10, 37, 64);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("OFFICIAL SERVICE AGREEMENT & SPECIFICATION", 15, 52);

      // Horizontal line
      doc.setDrawColor(200, 200, 200);
      doc.line(15, 56, 195, 56);

      // Meta details (Date)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Agreement Date: ${new Date().toLocaleDateString()}`, 15, 62);
      doc.text(`Reference No: EEC-AGR-${Math.floor(100000 + Math.random() * 900000)}`, 140, 62);

      // Client Details Section
      doc.setFillColor(245, 245, 247);
      doc.rect(15, 68, 180, 28, "F");

      doc.setTextColor(10, 37, 64);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("CLIENT / PROJECT OWNER DETAILS", 20, 74);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 50);
      doc.text(`Owner Name:   ${form.name}`, 20, 80);
      doc.text(`Contact No:       ${form.phone}`, 20, 85);
      doc.text(`Site Address:     ${form.address}`, 20, 90);

      // Selected Package Details Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(10, 37, 64);
      doc.text("SELECTED SERVICE PACKAGE", 15, 106);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(212, 160, 23); // #d4a017 gold
      doc.text(`${pkg.name} Package`, 15, 113);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(10, 37, 64);
      doc.text(`Standard Price: ${pkg.price} (From: ${pkg.priceFrom})`, 15, 120);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      doc.text("SCOPE OF INCLUDED WORK & FEATURES:", 15, 128);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      let featureY = 134;
      pkg.features.forEach((feature) => {
        if (featureY < 210) {
          doc.text(`[x]  ${feature}`, 18, featureY);
          featureY += 6;
        }
      });

      // Terms of Agreement
      doc.setDrawColor(200, 200, 200);
      doc.line(15, featureY + 2, 195, featureY + 2);

      doc.setTextColor(10, 37, 64);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("TERMS AND CONDITIONS", 15, featureY + 8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 100, 100);
      doc.text("1. All engineering and architectural designs comply with the Nepal National Building Code (NBC) & municipal bypass guidelines.", 15, featureY + 13);
      doc.text("2. Construction supervision will follow strict ISO 9001:2015 Quality Management processes.", 15, featureY + 17);
      doc.text("3. Custom amendments to the standard scope are subject to additional engineering design charges.", 15, featureY + 21);

      // Signature Area
      const sigY = 245;
      doc.line(15, sigY, 80, sigY);
      doc.line(130, sigY, 195, sigY);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(10, 37, 64);
      doc.text("Client Authorized Signature", 15, sigY + 5);
      doc.text("For Express Engineering Consultancy", 130, sigY + 5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(form.name, 15, sigY + 9);
      doc.text("Authorized Representative", 130, sigY + 9);

      // Add Drawn Signature Image
      if (signatureImage) {
        doc.addImage(signatureImage, "PNG", 20, sigY - 22, 45, 20);
      }

      // Save PDF
      doc.save(`ExpressEngineering_${pkg.name}_Agreement.pdf`);

      // 2. Redirect to WhatsApp with filled details
      const whatsappText = `I want the Engineering Services from the Express Engineering.\n\n` +
        `*SERVICE AGREEMENT GENERATED* 📝\n\n` +
        `• *Package:* ${pkg.name} (${pkg.price})\n` +
        `• *Owner Name:* ${form.name}\n` +
        `• *Contact:* ${form.phone}\n` +
        `• *Address:* ${form.address}\n\n` +
        `I have signed and downloaded the service agreement PDF. Please confirm our initial site visit consultation.`;

      const whatsappUrl = `https://wa.me/9779810555494?text=${encodeURIComponent(whatsappText)}`;

      // Slight timeout to allow PDF download to start smoothly before redirect
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        setIsSubmitting(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Error generating PDF. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-fade-up text-slate-900 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-[#0a2540]">
              {lang === "en" ? "Service Agreement Form" : "सेवा सम्झौता फारम"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === "en"
                ? `Provide details to generate your PDF agreement for the ${pkg.name} Package`
                : `${pkg.name} प्याकेजको लागि सम्झौता PDF तयार गर्न विवरण भर्नुहोस्`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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

        {/* Selected Package summary */}
        <div className="mt-4 rounded-xl border border-[#d4a017]/20 bg-[#d4a017]/5 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#d4a017]">
              {pkg.tag}
            </span>
            <h4 className="text-base font-bold text-[#0a2540]">{pkg.name}</h4>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">
              {pkg.priceFrom}
            </span>
            <span className="text-lg font-black text-[#0a2540]">{pkg.price}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                {lang === "en" ? "Owner Name" : "घरधनी / सञ्चालकको नाम"} *
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white focus:ring-2 focus:ring-[#0a2540]/10"
                placeholder={lang === "en" ? "e.g. Ram Prasad Shrestha" : "जस्तै: राम प्रसाद श्रेष्ठ"}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                {lang === "en" ? "Contact Number" : "सम्पर्क नम्बर"} *
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white focus:ring-2 focus:ring-[#0a2540]/10"
                placeholder="e.g. +977-98XXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              {lang === "en" ? "Project Site Address" : "आयोजना स्थलको ठेगाना"} *
            </label>
            <input
              required
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white focus:ring-2 focus:ring-[#0a2540]/10"
              placeholder={lang === "en" ? "e.g. Jhamsikhel, Lalitpur" : "जस्तै: झम्सीखेल, ललितपुर"}
            />
          </div>

          {/* Signature Pad */}
          <SignaturePad lang={lang} onSave={(dataUrl) => setSignatureImage(dataUrl)} />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/3 rounded-lg border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {lang === "en" ? "Cancel" : "रद्द गर्नुहोस्"}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-2/3 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0a2540] to-[#1e6091] py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/20 transition-all hover:shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {lang === "en" ? "Generating Agreement..." : "सम्झौता तयार हुँदै..."}
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {lang === "en" ? "Download PDF & Open WhatsApp" : "PDF डाउनलोड र व्हाट्सएप खोल्नुहोस्"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
