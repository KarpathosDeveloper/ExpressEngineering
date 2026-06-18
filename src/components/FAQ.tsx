import { useState } from "react";
import type { Lang } from "../i18n";

type Props = { lang: Lang };

export default function FAQ({ lang }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = lang === "en"
    ? [
        {
          q: "Can I download the package and use it immediately?",
          a: "Yes. After downloading the package, you will receive a detailed PDF file containing drawings, BOQ, scope, and contact instructions. Our team will reach out within 24 hours to begin the project.",
        },
        {
          q: "Do you offer custom packages or only the three listed?",
          a: "We specialize in customization. You can choose any combination of services or let us design a bespoke turnkey package tailored to your budget and timeline.",
        },
        {
          q: "Do you deliver projects outside Kathmandu Valley?",
          a: "Absolutely. We have successfully completed projects across all seven provinces — from remote districts in Karnali to urban centers in Province 1 and Lumbini.",
        },
        {
          q: "What is included in the municipal package?",
          a: "Building permit application, architectural & structural drawings, structural analysis, municipality coordination, follow-ups, and final occupancy certificate support.",
        },
        {
          q: "How long does the entire process take?",
          a: "Essential Package: 4–6 weeks. Complete Package: 3–4 months. Turnkey: 9–18 months depending on scope and site complexity.",
        },
      ]
    : [
        {
          q: "के म प्याकेज डाउनलोड गरेर तुरुन्त प्रयोग गर्न सक्छु?",
          a: "हो। प्याकेज डाउनलोड गरेपछि तपाईंले ड्रइङ्ग, BOQ, स्कोप र सम्पर्क निर्देशन सहितको विस्तृत PDF प्राप्त गर्नुहुन्छ। हाम्रो टोली २४ घण्टाभित्र सम्पर्क गर्छ।",
        },
        {
          q: "के तपाईंले कस्टम प्याकेज बनाउनुहुन्छ वा केवल तीनवटा मात्र?",
          a: "हामी कस्टमाइजेसनमा विशेषज्ञ छौं। तपाईंले कुनै पनि सेवा संयोजन छान्न सक्नुहुन्छ वा हामीलाई तपाईंको बजेट र समयअनुसार अनुकूलित प्याकेज बनाउन दिनुहोस्।",
        },
        {
          q: "के तपाईं काठमाडौं उपत्यका बाहिर पनि काम गर्नुहुन्छ?",
          a: "निश्चय पनि। हामीले कर्णालीका दुर्गम जिल्लादेखि प्रदेश १ र लुम्बिनीका शहरी केन्द्रसम्म सबै सात प्रदेशमा आयोजना सम्पन्न गरेका छौं।",
        },
        {
          q: "नगरपालिका प्याकेजमा के समावेश छ?",
          a: "भवन अनुमति आवेदन, वास्तुशिल्प र संरचनात्मक ड्रइङ्ग, संरचनात्मक विश्लेषण, नगरपालिका समन्वय, फलो-अप र अन्तिम अधिभोग प्रमाणपत्र सहयोग।",
        },
        {
          q: "सम्पूर्ण प्रक्रिया कति समय लाग्छ?",
          a: "आधारभूत प्याकेज: ४–६ हप्ता। पूर्ण प्याकेज: ३–४ महिना। टर्नकी: स्कोप र साइटको जटिलताअनुसार ९–१८ महिना।",
        },
      ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
            {lang === "en" ? "FAQ" : "बारम्बार सोधिने प्रश्न"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {lang === "en" ? "Frequently Asked Questions" : "बारम्बार सोधिने प्रश्नहरू"}
          </h2>
        </div>

        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {faqs.map((item, index) => (
            <div key={index} className="group">
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between px-7 py-5 text-left transition-colors hover:bg-slate-50"
              >
                <span className="pr-8 text-sm font-semibold text-slate-900 sm:text-base">
                  {item.q}
                </span>
                <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-xl transition-all ${open === index ? "border-[#0a2540] rotate-45 text-[#0a2540]" : "border-slate-200 text-slate-400"}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-7 pb-6 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
