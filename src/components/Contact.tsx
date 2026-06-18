import { useState, type FormEvent } from "react";
import { IconPhone, IconMail, IconMapPin, IconClock, IconArrow, IconWhatsApp } from "./Icons";
import type { Lang } from "../i18n";
import { translations } from "../i18n";

type Props = { lang: Lang };

export default function Contact({ lang }: Props) {
  const t = translations[lang].contact;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: t.services[0],
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", service: t.services[0], message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="bg-[#fafaf7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a017]" />
            {lang === "en" ? "Contact" : "सम्पर्क"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">{t.subheading}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    {t.name}
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white focus:ring-2 focus:ring-[#0a2540]/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    {t.email}
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white focus:ring-2 focus:ring-[#0a2540]/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    {t.phone}
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white focus:ring-2 focus:ring-[#0a2540]/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    {t.service}
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white focus:ring-2 focus:ring-[#0a2540]/10"
                  >
                    {t.services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  {t.message}
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white focus:ring-2 focus:ring-[#0a2540]/10"
                />
              </div>

              <button
                type="submit"
                className="mt-6 group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0a2540] to-[#1e6091] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-900/20 transition-all hover:shadow-lg hover:shadow-blue-900/30 sm:w-auto"
              >
                {submitted
                  ? lang === "en"
                    ? "✓ Request Sent Successfully"
                    : "✓ अनुरोध सफलतापूर्वक पठाइयो"
                  : t.send}
                {!submitted && <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                {t.info.title}
              </h3>
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50 text-[#d4a017]">
                    <IconMapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {t.info.addressLabel}
                    </div>
                    <div className="mt-0.5 text-sm text-slate-800">{t.info.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50 text-[#d4a017]">
                    <IconPhone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {t.info.phoneLabel}
                    </div>
                    <a
                      href="tel:+9779810555494"
                      className="mt-0.5 block text-sm text-slate-800 hover:text-[#0a2540]"
                    >
                      +977-9810555494
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50 text-[#d4a017]">
                    <IconMail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {t.info.emailLabel}
                    </div>
                    <a
                      href="mailto:info@expresseng.com.np"
                      className="mt-0.5 block text-sm text-slate-800 hover:text-[#0a2540]"
                    >
                      info@expresseng.com.np
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50 text-[#d4a017]">
                    <IconClock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {t.info.hoursLabel}
                    </div>
                    <div className="mt-0.5 text-sm text-slate-800">{t.info.hours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/9779810555494"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-5 text-white shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:shadow-emerald-500/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                  <IconWhatsApp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">{t.common.whatsApp}</div>
                  <div className="text-xs text-emerald-50/85">
                    {lang === "en" ? "Quick response guaranteed" : "द्रुत प्रतिक्रिया सुनिश्चित"}
                  </div>
                </div>
              </div>
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="tel:+9779810555494"
              className="group flex items-center justify-between rounded-2xl border-2 border-[#0a2540] bg-white p-5 text-[#0a2540] transition-all hover:bg-[#0a2540] hover:text-white"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a2540] text-white group-hover:bg-white group-hover:text-[#0a2540]">
                  <IconPhone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">{t.common.callNow}</div>
                  <div className="text-xs opacity-70">+977-9810555494</div>
                </div>
              </div>
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
