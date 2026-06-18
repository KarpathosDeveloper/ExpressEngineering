import { useState } from "react";
import type { Lang } from "../i18n";

type Props = { lang: Lang };

type ProjectCategory = {
  key: string;
  title: { en: string; ne: string };
  desc: { en: string; ne: string };
  icon: string;
  standards: { en: string[]; ne: string[] };
};

const categories: ProjectCategory[] = [
  {
    key: "Residential",
    title: { en: "Residential Projects", ne: "आवासीय आयोजनाहरू" },
    desc: {
      en: "Custom modern villas, traditional houses, and luxury residential duplexes designed to last.",
      ne: "कस्टम आधुनिक भिला, परम्परागत घर र लक्जरी आवासीय डुप्लेक्सहरू जुन लामो समय टिक्छन्।",
    },
    icon: "🏠",
    standards: {
      en: ["NBC 105:2020 Seismic Code Compliance", "Vastu Shastra Optimization", "ISO 9001 Structural Auditing"],
      ne: ["NBC १०५:२०२० भूकम्पीय कोड अनुपालन", "वास्तुशास्त्र अनुकूलन", "आईएसओ ९००१ संरचनात्मक अडिटिङ"],
    },
  },
  {
    key: "Commercial",
    title: { en: "Commercial Projects", ne: "व्यावसायिक आयोजनाहरू" },
    desc: {
      en: "Multi-story shopping complexes, corporate offices, and mixed-use commercial buildings.",
      ne: "बहु-तले व्यापारिक कम्प्लेक्स, कर्पोरेट कार्यालय र मिश्रित-प्रयोग व्यावसायिक भवनहरू।",
    },
    icon: "🏢",
    standards: {
      en: ["NBC 206 Fire Safety Compliance", "Efficient Space-to-Utility Ratio", "High-efficiency MEP Design"],
      ne: ["NBC २०६ अग्नि सुरक्षा अनुपालन", "कुशल स्पेस-उपयोगिता अनुपात", "उच्च-दक्षता MEP डिजाइन"],
    },
  },
  {
    key: "Interior Design",
    title: { en: "Interior Design Projects", ne: "इन्टेरियर डिजाइन आयोजनाहरू" },
    desc: {
      en: "Turnkey interior designs for homes, retail outlets, and offices with custom furniture.",
      ne: "घर, रिटेल आउटलेट र कार्यालयहरूको लागि कस्टम फर्निचरसहितको पूर्ण इन्टेरियर डिजाइन।",
    },
    icon: "🛋️",
    standards: {
      en: ["Ergonomic Design Standards", "High-durability Eco-friendly Materials", "Bespoke 3D Walkthrough Preview"],
      ne: ["एर्गोनोमिक डिजाइन मापदण्ड", "उच्च-टिकाउ पर्यावरण-अनुकूल सामग्री", "बेस्पोक ३D वाकथ्रू पूर्वावलोकन"],
    },
  },
  {
    key: "Hospital",
    title: { en: "Hospital & Medical Projects", ne: "अस्पताल तथा मेडिकल आयोजनाहरू" },
    desc: {
      en: "Specialized healthcare facilities, dental clinics, diagnostic centers, and hospital complexes.",
      ne: "विशेष स्वास्थ्य सेवा सुविधाहरू, दन्त क्लिनिकहरू, निदान केन्द्रहरू र अस्पताल कम्प्लेक्सहरू।",
    },
    icon: "🏥",
    standards: {
      en: ["WHO Medical Infrastructure Standards", "Radiation Shielding (X-Ray/MRI rooms)", "Aseptic HVAC Airflow Systems"],
      ne: ["डब्ल्यूएचओ चिकित्सा पूर्वाधार मापदण्ड", "विकिरण ढाल (एक्स-रे/एमआरआई कोठाहरू)", "एसेप्टिक HVAC एयरफ्लो प्रणाली"],
    },
  },
  {
    key: "School",
    title: { en: "School & College Projects", ne: "विद्यालय तथा कलेज आयोजनाहरू" },
    desc: {
      en: "Safe educational campuses, interactive classrooms, auditoriums, and sports complexes.",
      ne: "सुरक्षित शैक्षिक क्याम्पस, अन्तरक्रियात्मक कक्षाकोठा, अडिटोरियम र खेलकुद कम्प्लेक्सहरू।",
    },
    icon: "🏫",
    standards: {
      en: ["Child-friendly Ergonomic Layouts", "Disaster-resilient Structural Frame", "Natural Lighting & Acoustic Design"],
      ne: ["बाल-मैत्री एर्गोनोमिक लेआउट", "विपद्-उत्थानशील संरचनात्मक फ्रेम", "प्राकृतिक प्रकाश र ध्वनिक डिजाइन"],
    },
  },
  {
    key: "Hotel",
    title: { en: "Hotel & Resort Projects", ne: "होटल तथा रिसोर्ट आयोजनाहरू" },
    desc: {
      en: "Luxury hotels, eco-resorts, boutique homestays, and fine-dining restaurants.",
      ne: "लक्जरी होटलहरू, इको-रिसोर्टहरू, बुटिक होमस्टे र फाइन-डाइनिंग रेस्टुरेन्टहरू।",
    },
    icon: "🏨",
    standards: {
      en: ["Hospitality Operations Flow Design", "ISO 14001 Waste Recycling Management", "Premium Finishes Quality Control"],
      ne: ["आतिथ्य सञ्चालन प्रवाह डिजाइन", "आईएसओ १४००१ फोहोर रिसाइक्लिङ्ग व्यवस्थापन", "प्रिमियम फिनिश गुणस्तर नियन्त्रण"],
    },
  },
];

const trackingStages = [
  { key: "received", label: { en: "Inquiry Received", ne: "अनुरोध प्राप्त भयो" }, desc: { en: "Client request logged in database system.", ne: "ग्राहकको अनुरोध डाटाबेस प्रणालीमा दर्ता भयो।" } },
  { key: "consultation", label: { en: "Consultation Scheduled", ne: "परामर्श तय भयो" }, desc: { en: "Vastu, architectural style, and budget discussion.", ne: "वास्तुशास्त्र, वास्तुशैली र बजेट छलफल।" } },
  { key: "survey", label: { en: "Site Survey & Soil Test", ne: "साइट सर्वेक्षण र माटो परीक्षण" }, desc: { en: "Topographic mapping and structural soil bearing capacity.", ne: "टोपोग्राफिक म्यापिङ र संरचनात्मक माटो वहन क्षमता।" } },
  { key: "design", label: { en: "Engineering Design & BOQ", ne: "इन्जिनियरिङ्ग डिजाइन र BOQ" }, desc: { en: "Architectural, structural, and estimate compilation.", ne: "वास्तुकला, संरचनात्मक र लागत अनुमान संकलन।" } },
  { key: "municipal", label: { en: "Municipal Permit (Naksa Passing)", ne: "नगरपालिका स्वीकृति (नक्सा पास)" }, desc: { en: "Local government clearance and building permit issuance.", ne: "स्थानीय निकायको नक्सा स्वीकृति र भवन इजाजतपत्र जारी।" } },
  { key: "execution", label: { en: "Construction Execution (ISO Checked)", ne: "निर्माण कार्य (आईएसओ गुणस्तर जाँच)" }, desc: { en: "Physical construction and quality audit parameters.", ne: "भौतिक निर्माण र गुणस्तर अडिट मापदण्डहरू।" } },
  { key: "handover", label: { en: "Project Handover", ne: "आयोजना हस्तान्तरण" }, desc: { en: "Final inspection, occupancy certificate and handover.", ne: "अन्तिम निरीक्षण, अधिभोग प्रमाणपत्र र चाबी हस्तान्तरण।" } },
];

export default function Projects({ lang }: Props) {
  const [activeTab, setActiveTab] = useState(categories[0].key);
  const [formStep, setFormStep] = useState(1);
  const [inquiryForm, setInquiryForm] = useState({
    owner_name: "",
    contact: "",
    email: "",
    address: "",
    description: "",
    citizenship_no: "",
    site_area: "",
    lalpurja_file: "", // Base64
    citizenship_file: "", // Base64
    site_photo: "", // Base64
  });

  const [fileNames, setFileNames] = useState({
    lalpurja: "",
    citizenship: "",
    site_photo: "",
  });

  const [inquiryResult, setInquiryResult] = useState<{
    inquiry_number: string;
    status: string;
  } | null>(null);

  const [trackNumber, setTrackNumber] = useState("");
  const [trackedProject, setTrackedProject] = useState<any | null>(null);
  const [trackError, setTrackError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  // Translation dictionary for local components
  const tLocal = {
    en: {
      step1Title: "Step 1: Client Profile",
      step1Desc: "Enter owner contact and site details.",
      step2Title: "Step 2: Upload Documents",
      step2Desc: "Upload deed, citizenship, and site photos.",
      step3Title: "Step 3: Review & Submit",
      step3Desc: "Review and register your consultancy profile.",
      ownerName: "Client / Owner Name",
      contactNum: "Contact Number",
      emailAddr: "Email Address",
      siteAddr: "Site Location Address",
      siteArea: "Land/Site Area (e.g. 5 Aana, 1500 sq ft)",
      citizenshipNo: "Citizenship ID Number",
      lalpurjaLabel: "Lalpurja (Land Deed Certificate)",
      citizenshipLabel: "Citizenship Card (ID)",
      sitePhotoLabel: "Site / Plot Photo",
      uploadPlaceholder: "Drag & drop or click to upload PDF/Image",
      submitBtn: "Submit Application & Start Live Tracking",
      prevBtn: "Back",
      nextBtn: "Next Step",
      trackingHeader: "Live Project Status Portal",
      profileDetails: "Owner & Site Profile",
      verifiedDocs: "Uploaded Verification Documents",
      contactConsultant: "Need support? Call our hotline at +977-9810555494",
      lalpurjaFile: "Lalpurja Land Deed",
      citizenshipFile: "Citizenship Card",
      sitePhotoFile: "Site Photo",
      uploaded: "Uploaded",
      missing: "Missing",
      inquireFor: "Create Profile & Inquire",
    },
    ne: {
      step1Title: "चरण १: ग्राहक प्रोफाइल",
      step1Desc: "घरधनीको सम्पर्क र जग्गाको क्षेत्रफल विवरण।",
      step2Title: "चरण २: कागजात अपलोड",
      step2Desc: "लालपुर्जा, नागरिकता र साइटको फोटो बुझाउनुहोस्।",
      step3Title: "चरण ३: समीक्षा र दर्ता",
      step3Desc: "समीक्षा गर्नुहोस् र आफ्नो प्रोफाइल दर्ता गर्नुहोस्।",
      ownerName: "घरधनीको पूरा नाम",
      contactNum: "सम्पर्क नम्बर",
      emailAddr: "इमेल ठेगाना",
      siteAddr: "जग्गाको ठेगाना (जस्तै: कुपण्डोल, ललितपुर)",
      siteArea: "जग्गाको क्षेत्रफल (जस्तै: ५ आना, १५०० वर्ग फिट)",
      citizenshipNo: "नागरिकता नम्बर",
      lalpurjaLabel: "लालपुर्जा (जग्गा धनी प्रमाण पत्र)",
      citizenshipLabel: "नागरिकता प्रमाणपत्र (अगाडि/पछाडि)",
      sitePhotoLabel: "जग्गा / साइटको फोटो",
      uploadPlaceholder: "फाइल यहाँ तान्नुहोस् वा अपलोड गर्न क्लिक गर्नुहोस्",
      submitBtn: "आवेदन बुझाउनुहोस् र ट्र्याकिङ सुरु गर्नुहोस्",
      prevBtn: "पछाडि",
      nextBtn: "अर्को चरण",
      trackingHeader: "आयोजनाको प्रत्यक्ष अवस्था पोर्टल",
      profileDetails: "जग्गाधनी र साइट प्रोफाइल",
      verifiedDocs: "अपलोड गरिएका प्रमाणीकरण कागजातहरू",
      contactConsultant: "सहयोग चाहिन्छ? हाम्रो हटलाइनमा +977-9810555494 मा कल गर्नुहोस्",
      lalpurjaFile: "लालपुर्जा प्रमाण पत्र",
      citizenshipFile: "नागरिकता प्रमाणपत्र",
      sitePhotoFile: "साइटको फोटो",
      uploaded: "अपलोड गरिएको",
      missing: "नभएको",
      inquireFor: "प्रोफाइल बनाउनुहोस् र सोधपुछ गर्नुहोस्",
    }
  };

  const t = tLocal[lang];

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "lalpurja_file" | "citizenship_file" | "site_photo"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const shortName = file.name.length > 22 ? file.name.substring(0, 19) + "..." : file.name;
    const key = field === "site_photo" ? "site_photo" : field.replace("_file", "") as "lalpurja" | "citizenship";
    
    setFileNames((prev) => ({ ...prev, [key]: `${shortName} (${(file.size / 1024).toFixed(0)} KB)` }));

    try {
      const base64 = await toBase64(file);
      setInquiryForm((prev) => ({ ...prev, [field]: base64 }));
    } catch (err) {
      console.error("Error reading file:", err);
      alert(lang === "en" ? "Error reading file" : "फाइल पढ्नमा समस्या भयो");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (
    e: React.DragEvent,
    field: "lalpurja_file" | "citizenship_file" | "site_photo"
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const shortName = file.name.length > 22 ? file.name.substring(0, 19) + "..." : file.name;
    const key = field === "site_photo" ? "site_photo" : field.replace("_file", "") as "lalpurja" | "citizenship";

    setFileNames((prev) => ({ ...prev, [key]: `${shortName} (${(file.size / 1024).toFixed(0)} KB)` }));

    try {
      const base64 = await toBase64(file);
      setInquiryForm((prev) => ({ ...prev, [field]: base64 }));
    } catch (err) {
      console.error("Error reading file:", err);
      alert(lang === "en" ? "Error reading file" : "फाइल पढ्नमा समस्या भयो");
    }
  };

  const validateStep = (step: number) => {
    if (step === 1) {
      return (
        inquiryForm.owner_name.trim() !== "" &&
        inquiryForm.contact.trim() !== "" &&
        inquiryForm.address.trim() !== "" &&
        inquiryForm.site_area.trim() !== ""
      );
    }
    if (step === 2) {
      return (
        inquiryForm.citizenship_no.trim() !== "" &&
        inquiryForm.lalpurja_file !== "" &&
        inquiryForm.citizenship_file !== ""
      );
    }
    return true;
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) {
      alert(lang === "en" ? "Please fill all required fields and upload files." : "कृपया सबै आवश्यक विवरणहरू र फाइलहरू अपलोड गर्नुहोस्।");
      return;
    }

    setIsSubmitting(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${API_BASE}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inquiryForm,
          project_type: activeTab,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      const data = await response.json();
      setInquiryResult(data);
      // Reset form
      setInquiryForm({
        owner_name: "",
        contact: "",
        email: "",
        address: "",
        description: "",
        citizenship_no: "",
        site_area: "",
        lalpurja_file: "",
        citizenship_file: "",
        site_photo: "",
      });
      setFileNames({ lalpurja: "", citizenship: "", site_photo: "" });
      setFormStep(1);
    } catch (err) {
      console.error(err);
      alert(lang === "en" ? "Error submitting inquiry" : "अनुरोध पेश गर्दा त्रुटि भयो");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackNumber.trim()) return;
    setIsTracking(true);
    setTrackError("");
    setTrackedProject(null);

    try {
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${API_BASE}/api/inquiries/track/${trackNumber.trim().toUpperCase()}`);
      if (!response.ok) {
        throw new Error(lang === "en" ? "Inquiry number not found" : "अनुरोध नम्बर फेला परेन");
      }
      const data = await response.json();
      setTrackedProject(data);
    } catch (err: any) {
      setTrackError(err.message);
    } finally {
      setIsTracking(false);
    }
  };

  const getStageIndex = (stageLabel: string) => {
    const idx = trackingStages.findIndex(
      (s) => s.label.en.toLowerCase() === stageLabel.toLowerCase() || s.key.toLowerCase() === stageLabel.toLowerCase()
    );
    if (idx === -1) {
      if (stageLabel.includes("Received")) return 0;
      if (stageLabel.includes("Consultation")) return 1;
      if (stageLabel.includes("Site Survey") || stageLabel.includes("Survey")) return 2;
      if (stageLabel.includes("Design")) return 3;
      if (stageLabel.includes("Municipal")) return 4;
      if (stageLabel.includes("Execution") || stageLabel.includes("Construction")) return 5;
      if (stageLabel.includes("Handover")) return 6;
      return 0;
    }
    return idx;
  };

  const currentCategory = categories.find((c) => c.key === activeTab) || categories[0];

  return (
    <section id="what-we-do" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a017]" />
            {lang === "en" ? "WHAT WE DO" : "हाम्रो कार्यक्षेत्र"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {lang === "en" ? "Comprehensive Engineering & Construction" : "एकीकृत इन्जिनियरिङ्ग तथा निर्माण"}
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            {lang === "en"
              ? "We provide architectural design, structural engineering, municipality approvals, material logistics, and quality-controlled construction under strict ISO standardizations."
              : "हामी कडा आईएसओ मापदण्ड अन्तर्गत वास्तुशिल्प डिजाइन, संरचनात्मक इन्जिनियरिङ्ग, नगरपालिका स्वीकृति, निर्माण सामग्री र गुणस्तर नियन्त्रित निर्माण सेवा प्रदान गर्दछौं।"}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setActiveTab(c.key);
                setInquiryResult(null);
              }}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === c.key
                  ? "bg-[#0a2540] text-white shadow-lg"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <span className="mr-1.5">{c.icon}</span>
              {c.title[lang]}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-sm font-bold text-[#d4a017] uppercase tracking-wider">
                {lang === "en" ? "Core Capabilities" : "मुख्य क्षमताहरू"}
              </span>
              <h3 className="text-2xl font-black text-[#0a2540]">{currentCategory.title[lang]}</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {currentCategory.desc[lang]}
              </p>

              <div className="space-y-2.5 pt-3">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {lang === "en" ? "Quality Standards Applied:" : "लागू गरिएका गुणस्तर मापदण्डहरू:"}
                </span>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {currentCategory.standards[lang].map((std, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        ✓
                      </span>
                      {std}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquiry Form Wizard inside Tab */}
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="text-sm font-bold text-[#0a2540] uppercase tracking-wider mb-4 border-b pb-2 flex justify-between items-center">
                  <span>{t.inquireFor}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1e6091] font-bold">
                    {currentCategory.key}
                  </span>
                </h4>

                {inquiryResult ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-2xl font-bold">
                      ✓
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-bold text-slate-900">
                        {lang === "en" ? "Inquiry Registered Successfully" : "अनुरोध सफलतापूर्वक दर्ता भयो"}
                      </h5>
                      <p className="text-xs text-slate-500">
                        {lang === "en"
                          ? "Your profile has been created and files uploaded. Live tracking is active."
                          : "तपाईंको प्रोफाइल सिर्जना भयो र फाइलहरू अपलोड भयो। प्रत्यक्ष ट्र्याकिङ सक्रिय छ।"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-4 border border-dashed border-slate-300">
                      <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {lang === "en" ? "Inquiry Tracking Number" : "ट्र्याकिङ नम्बर"}
                      </span>
                      <span className="text-xl font-black text-[#0a2540] block tracking-widest mt-0.5">
                        {inquiryResult.inquiry_number}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {lang === "en"
                        ? "Use this tracking number below to follow the live progress of your municipal permit, design reviews, and engineering audits."
                        : "आफ्नो नक्सा पास र निर्माणको प्रत्यक्ष प्रगति ट्र्याक गर्न यो कोड तल प्रयोग गर्नुहोस्।"}
                    </p>
                    <button
                      onClick={() => {
                        setTrackNumber(inquiryResult.inquiry_number);
                        setInquiryResult(null);
                        // Trigger immediate track
                        setTimeout(() => {
                          const trackForm = document.getElementById("track-form");
                          if (trackForm) {
                            trackForm.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                          }
                        }, 50);
                      }}
                      className="inline-flex rounded-lg bg-[#0a2540] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1e6091] transition"
                    >
                      {lang === "en" ? "Open Live Tracking Portal" : "लाइभ ट्र्याकिङ पोर्टल खोल्नुहोस्"}
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Step Indicators */}
                    <div className="mb-6 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className={`flex flex-col items-center gap-1 flex-1 text-center bg-transparent border-0 cursor-pointer ${
                          formStep >= 1 ? "text-[#0a2540]" : "text-slate-300"
                        }`}
                      >
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          formStep >= 1 ? "bg-[#0a2540] text-white" : "bg-slate-100 text-slate-400"
                        }`}>1</span>
                        <span className="text-[10px] font-bold">{lang === "en" ? "Profile" : "प्रोफाइल"}</span>
                      </button>
                      <div className={`h-0.5 flex-1 mx-2 transition-colors ${formStep >= 2 ? "bg-[#0a2540]" : "bg-slate-200"}`} />
                      <button
                        type="button"
                        onClick={() => validateStep(1) && setFormStep(2)}
                        disabled={!validateStep(1)}
                        className={`flex flex-col items-center gap-1 flex-1 text-center bg-transparent border-0 cursor-pointer ${
                          formStep >= 2 ? "text-[#0a2540]" : "text-slate-300"
                        }`}
                      >
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          formStep >= 2 ? "bg-[#0a2540] text-white" : "bg-slate-100 text-slate-400"
                        }`}>2</span>
                        <span className="text-[10px] font-bold">{lang === "en" ? "Documents" : "कागजात"}</span>
                      </button>
                      <div className={`h-0.5 flex-1 mx-2 transition-colors ${formStep >= 3 ? "bg-[#0a2540]" : "bg-slate-200"}`} />
                      <button
                        type="button"
                        onClick={() => validateStep(1) && validateStep(2) && setFormStep(3)}
                        disabled={!validateStep(1) || !validateStep(2)}
                        className={`flex flex-col items-center gap-1 flex-1 text-center bg-transparent border-0 cursor-pointer ${
                          formStep >= 3 ? "text-[#0a2540]" : "text-slate-300"
                        }`}
                      >
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          formStep >= 3 ? "bg-[#0a2540] text-white" : "bg-slate-100 text-slate-400"
                        }`}>3</span>
                        <span className="text-[10px] font-bold">{lang === "en" ? "Review" : "समीक्षा"}</span>
                      </button>
                    </div>

                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      {/* STEP 1: Contact Profile */}
                      {formStep === 1 && (
                        <div className="space-y-3 animate-fade-in">
                          <div className="mb-2">
                            <h5 className="text-xs font-bold text-slate-700">{t.step1Title}</h5>
                            <p className="text-[10px] text-slate-400">{t.step1Desc}</p>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{t.ownerName} *</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. Ram Bahadur Shrestha"
                              value={inquiryForm.owner_name}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, owner_name: e.target.value })}
                              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white"
                            />
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{t.contactNum} *</label>
                              <input
                                required
                                type="tel"
                                placeholder="e.g. 9810555494"
                                value={inquiryForm.contact}
                                onChange={(e) => setInquiryForm({ ...inquiryForm, contact: e.target.value })}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{t.emailAddr}</label>
                              <input
                                type="email"
                                placeholder="e.g. ram@gmail.com"
                                value={inquiryForm.email}
                                onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{t.siteAddr} *</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. Imadol-4, Lalitpur"
                              value={inquiryForm.address}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, address: e.target.value })}
                              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{t.siteArea} *</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. 4 Aana 2 Paisa"
                              value={inquiryForm.site_area}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, site_area: e.target.value })}
                              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white"
                            />
                          </div>
                          <div className="pt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={() => validateStep(1) ? setFormStep(2) : alert(lang === "en" ? "Please fill all required profile fields." : "कृपया सबै आवश्यक विवरणहरू भर्नुहोस्।")}
                              className="rounded-lg bg-[#0a2540] text-white px-5 py-2 text-xs font-bold hover:bg-[#1e6091] transition"
                            >
                              {t.nextBtn} →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* STEP 2: Document Verification */}
                      {formStep === 2 && (
                        <div className="space-y-4 animate-fade-in">
                          <div className="mb-2">
                            <h5 className="text-xs font-bold text-slate-700">{t.step2Title}</h5>
                            <p className="text-[10px] text-slate-400">{t.step2Desc}</p>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{t.citizenshipNo} *</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. 27-01-76-12345"
                              value={inquiryForm.citizenship_no}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, citizenship_no: e.target.value })}
                              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white"
                            />
                          </div>

                          {/* Lalpurja file upload */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.lalpurjaLabel} *</span>
                            <div
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, "lalpurja_file")}
                              className="border-2 border-dashed border-slate-200 rounded-lg p-3 text-center hover:border-[#0a2540] transition bg-slate-50/30 cursor-pointer relative"
                            >
                              <input
                                required={!inquiryForm.lalpurja_file}
                                type="file"
                                accept=".pdf,image/*"
                                onChange={(e) => handleFileChange(e, "lalpurja_file")}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <p className="text-[10px] text-slate-500 font-semibold">
                                {fileNames.lalpurja || t.uploadPlaceholder}
                              </p>
                              {inquiryForm.lalpurja_file && (
                                <span className="inline-block mt-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">✓ Attached</span>
                              )}
                            </div>
                          </div>

                          {/* Citizenship card upload */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.citizenshipLabel} *</span>
                            <div
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, "citizenship_file")}
                              className="border-2 border-dashed border-slate-200 rounded-lg p-3 text-center hover:border-[#0a2540] transition bg-slate-50/30 cursor-pointer relative"
                            >
                              <input
                                required={!inquiryForm.citizenship_file}
                                type="file"
                                accept=".pdf,image/*"
                                onChange={(e) => handleFileChange(e, "citizenship_file")}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <p className="text-[10px] text-slate-500 font-semibold">
                                {fileNames.citizenship || t.uploadPlaceholder}
                              </p>
                              {inquiryForm.citizenship_file && (
                                <span className="inline-block mt-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">✓ Attached</span>
                              )}
                            </div>
                          </div>

                          {/* Site photo upload */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.sitePhotoLabel}</span>
                            <div
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, "site_photo")}
                              className="border-2 border-dashed border-slate-200 rounded-lg p-3 text-center hover:border-[#0a2540] transition bg-slate-50/30 cursor-pointer relative"
                            >
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "site_photo")}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <p className="text-[10px] text-slate-500 font-semibold">
                                {fileNames.site_photo || t.uploadPlaceholder}
                              </p>
                              {inquiryForm.site_photo && (
                                <div className="mt-2 flex flex-col items-center gap-1.5">
                                  <img src={inquiryForm.site_photo} alt="Preview" className="h-14 w-auto rounded object-cover border" />
                                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">✓ Preview Generated</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="pt-2 flex justify-between">
                            <button
                              type="button"
                              onClick={() => setFormStep(1)}
                              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                            >
                              ← {t.prevBtn}
                            </button>
                            <button
                              type="button"
                              onClick={() => validateStep(2) ? setFormStep(3) : alert(lang === "en" ? "Please fill Citizenship ID and upload required files." : "कृपया नागरिकता र आवश्यक फाइलहरू पेश गर्नुहोस्।")}
                              className="rounded-lg bg-[#0a2540] text-white px-5 py-2 text-xs font-bold hover:bg-[#1e6091] transition"
                            >
                              {t.nextBtn} →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* STEP 3: Review & Submit */}
                      {formStep === 3 && (
                        <div className="space-y-4 animate-fade-in">
                          <div className="mb-2">
                            <h5 className="text-xs font-bold text-slate-700">{t.step3Title}</h5>
                            <p className="text-[10px] text-slate-400">{t.step3Desc}</p>
                          </div>

                          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 space-y-2 text-xs">
                            <div className="grid grid-cols-3 border-b border-slate-200/60 pb-1.5">
                              <span className="font-semibold text-slate-500">{lang === "en" ? "Owner Name" : "घरधनीको नाम"}:</span>
                              <span className="col-span-2 font-bold text-slate-800">{inquiryForm.owner_name}</span>
                            </div>
                            <div className="grid grid-cols-3 border-b border-slate-200/60 pb-1.5">
                              <span className="font-semibold text-slate-500">{lang === "en" ? "Contact Number" : "सम्पर्क नम्बर"}:</span>
                              <span className="col-span-2 font-bold text-slate-800">{inquiryForm.contact}</span>
                            </div>
                            <div className="grid grid-cols-3 border-b border-slate-200/60 pb-1.5">
                              <span className="font-semibold text-slate-500">{lang === "en" ? "Site Address" : "ठेगाना"}:</span>
                              <span className="col-span-2 font-bold text-slate-850">{inquiryForm.address}</span>
                            </div>
                            <div className="grid grid-cols-3 border-b border-slate-200/60 pb-1.5">
                              <span className="font-semibold text-slate-500">{lang === "en" ? "Land site Area" : "जग्गा क्षेत्रफल"}:</span>
                              <span className="col-span-2 font-bold text-slate-800">{inquiryForm.site_area}</span>
                            </div>
                            <div className="grid grid-cols-3 border-b border-slate-200/60 pb-1.5">
                              <span className="font-semibold text-slate-500">{lang === "en" ? "Citizenship No" : "नागरिकता नम्बर"}:</span>
                              <span className="col-span-2 font-bold text-slate-800">{inquiryForm.citizenship_no}</span>
                            </div>
                            <div className="grid grid-cols-3 pb-1">
                              <span className="font-semibold text-slate-500">{lang === "en" ? "File Status" : "फाइलहरू"}:</span>
                              <span className="col-span-2 font-bold text-slate-700 flex flex-wrap gap-1 mt-0.5">
                                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px]">Lalpurja</span>
                                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px]">Citizenship</span>
                                {inquiryForm.site_photo && (
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px]">Site Photo</span>
                                )}
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                              {lang === "en" ? "Description & Special Instructions" : "विशेष अनुरोध वा थप जानकारी"}
                            </label>
                            <textarea
                              rows={2}
                              placeholder={lang === "en" ? "Enter any questions, Vastu requirements, or design references..." : "तपाईंका थप प्रश्नहरू, वास्तु आवश्यकताहरू वा डिजाइन प्राथमिकताहरू..."}
                              value={inquiryForm.description}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, description: e.target.value })}
                              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white"
                            />
                          </div>

                          <div className="pt-2 flex justify-between">
                            <button
                              type="button"
                              onClick={() => setFormStep(2)}
                              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                            >
                              ← {t.prevBtn}
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="rounded-lg bg-[#0a2540] px-5 py-2 text-xs font-bold text-white hover:bg-[#1e6091] transition"
                            >
                              {isSubmitting ? (lang === "en" ? "Submitting..." : "पेस हुँदै...") : t.submitBtn}
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Project Inquiry Tracker Widget */}
        <div className="mt-16 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-md lg:p-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xl font-extrabold text-[#0a2540]">
              {t.trackingHeader}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === "en"
                ? "Enter your unique Inquiry Number to view the live milestone tracking of your building permit, structural design, and construction status."
                : "आफ्नो भवन अनुमति, संरचनात्मक डिजाइन र निर्माण स्थितिको प्रत्यक्ष प्रगति विवरण हेर्न ट्र्याकिङ नम्बर राख्नुहोस्।"}
            </p>
          </div>

          <form id="track-form" onSubmit={handleTrackSubmit} className="mt-6 flex gap-2 max-w-md mx-auto">
            <input
              required
              type="text"
              placeholder="e.g. INQ-123456"
              value={trackNumber}
              onChange={(e) => setTrackNumber(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm uppercase tracking-widest text-slate-900 font-bold outline-none focus:border-[#0a2540] focus:bg-white"
            />
            <button
              type="submit"
              disabled={isTracking}
              className="rounded-lg bg-[#0a2540] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1e6091] transition flex items-center justify-center border-0 cursor-pointer"
            >
              {isTracking ? (lang === "en" ? "Tracking..." : "खोज्दै...") : (lang === "en" ? "Track" : "ट्र्याक")}
            </button>
          </form>

          {trackError && (
            <div className="mt-4 text-center text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              ⚠ {trackError}
            </div>
          )}

          {trackedProject && (
            <div className="mt-8 border-t border-slate-100 pt-6 animate-fade-up space-y-6">
              {/* Tracker Result Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    {lang === "en" ? "Client Name" : "ग्राहकको नाम"}
                  </span>
                  <span className="text-sm font-bold text-slate-800">{trackedProject.owner_name}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    {lang === "en" ? "Project Class" : "आयोजनाको प्रकार"}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#1e6091] border border-blue-100">
                    {trackedProject.project_type}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    {lang === "en" ? "Site Location" : "आयोजना स्थल"}
                  </span>
                  <span className="text-xs font-bold text-slate-700">{trackedProject.address}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    {lang === "en" ? "Active Status" : "अवस्था"}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 capitalize bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {trackedProject.status}
                  </span>
                </div>
              </div>

              {/* Comprehensive Project Profile & Document Status Cards */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* 1. Client / Project Specifications */}
                <div className="rounded-xl border border-slate-200 p-4 space-y-3">
                  <h4 className="text-xs font-bold text-[#0a2540] uppercase tracking-wider border-b pb-1.5">{t.profileDetails}</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <span className="text-slate-500 font-semibold">{lang === "en" ? "Contact Phone" : "सम्पर्क नम्बर"}:</span>
                    <span className="text-slate-800 font-bold">{trackedProject.contact}</span>

                    {trackedProject.email && (
                      <>
                        <span className="text-slate-500 font-semibold">{lang === "en" ? "Email Address" : "इमेल ठेगाना"}:</span>
                        <span className="text-slate-800 font-bold break-all">{trackedProject.email}</span>
                      </>
                    )}

                    <span className="text-slate-500 font-semibold">{lang === "en" ? "Site Area" : "जग्गाको क्षेत्रफल"}:</span>
                    <span className="text-slate-800 font-bold">{trackedProject.site_area || "N/A"}</span>

                    <span className="text-slate-500 font-semibold">{lang === "en" ? "Citizenship ID" : "नागरिकता प्रमाणपत्र"}:</span>
                    <span className="text-slate-800 font-bold">{trackedProject.citizenship_no || "N/A"}</span>
                  </div>
                </div>

                {/* 2. Document Checklist */}
                <div className="rounded-xl border border-slate-200 p-4 space-y-3">
                  <h4 className="text-xs font-bold text-[#0a2540] uppercase tracking-wider border-b pb-1.5">{t.verifiedDocs}</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded border border-slate-100">
                      <span className="font-semibold text-slate-700">{t.lalpurjaFile}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        trackedProject.lalpurja_file ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                      }`}>
                        {trackedProject.lalpurja_file ? `✓ ${t.uploaded}` : `✗ ${t.missing}`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded border border-slate-100">
                      <span className="font-semibold text-slate-700">{t.citizenshipFile}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        trackedProject.citizenship_file ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                      }`}>
                        {trackedProject.citizenship_file ? `✓ ${t.uploaded}` : `✗ ${t.missing}`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded border border-slate-100">
                      <span className="font-semibold text-slate-700">{t.sitePhotoFile}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        trackedProject.site_photo ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-400"
                      }`}>
                        {trackedProject.site_photo ? `✓ ${t.uploaded}` : `✗ ${t.missing}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Site Photo Preview if uploaded */}
              {trackedProject.site_photo && (
                <div className="rounded-xl border border-slate-200 p-4">
                  <h4 className="text-xs font-bold text-[#0a2540] uppercase tracking-wider border-b pb-1.5 mb-2">
                    {lang === "en" ? "Submitted Site/Plot Photo" : "पेश गरिएको जग्गा/साइटको फोटो"}
                  </h4>
                  <img
                    src={trackedProject.site_photo}
                    alt="Plot site preview"
                    className="max-h-48 w-auto rounded-lg object-cover border border-slate-200 shadow-sm"
                  />
                </div>
              )}

              {/* Interactive Milestone Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#0a2540] uppercase tracking-wider border-b pb-1.5">{lang === "en" ? "Approval & Construction Progress" : "स्वीकृति तथा निर्माण प्रगति विवरण"}</h4>
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-0.5 before:bg-slate-200">
                  {trackingStages.map((stage, i) => {
                    const currentIdx = getStageIndex(trackedProject.current_stage);
                    const isCompleted = i < currentIdx;
                    const isActive = i === currentIdx;
                    const isPending = i > currentIdx;

                    return (
                      <div key={stage.key} className="relative flex gap-4">
                        {/* Timeline Node */}
                        <span
                          className={`absolute -left-[23px] sm:-left-[29px] flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all duration-300 ${
                            isCompleted
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : isActive
                              ? "bg-blue-600 border-blue-600 text-white animate-pulse"
                              : "bg-white border-slate-300 text-slate-400"
                          }`}
                        >
                          {isCompleted ? "✓" : i + 1}
                        </span>

                        {/* Milestone content */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                            <h4
                              className={`text-xs sm:text-sm font-bold ${
                                isCompleted
                                  ? "text-slate-800"
                                  : isActive
                                  ? "text-blue-700"
                                  : "text-slate-400"
                              }`}
                            >
                              {stage.label[lang]}
                            </h4>
                            {isActive && (
                              <span className="text-[9px] font-black uppercase bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">
                                {lang === "en" ? "Active Stage" : "सक्रिय चरण"}
                              </span>
                            )}
                          </div>
                          <p
                            className={`mt-1 text-[11px] sm:text-xs leading-relaxed ${
                              isPending ? "text-slate-300" : "text-slate-500"
                            }`}
                          >
                            {stage.desc[lang]}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Support Hotline banner */}
              <div className="rounded-lg bg-blue-50 p-3 text-center border border-blue-100 text-xs font-semibold text-blue-900/80">
                📞 {t.contactConsultant}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
