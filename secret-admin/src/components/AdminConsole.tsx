import { useState, useEffect } from "react";
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

type Inquiry = {
  id: number;
  inquiry_number: string;
  owner_name: string;
  contact: string;
  email: string;
  address: string;
  project_type: string;
  description: string;
  status: string;
  current_stage: string;
  created_at: string;
};

type Order = {
  id: number;
  order_number: string;
  owner_name: string;
  contact: string;
  address: string;
  items: Array<{ name: string; category: string; quantity: number; price: number }>;
  total_price: number;
  status: string;
  created_at: string;
};

const stages = [
  "Inquiry Received",
  "Consultation Scheduled",
  "Site Survey & Soil Test",
  "Engineering Design & BOQ",
  "Municipal Permit (Naksa Passing)",
  "Construction Execution (ISO Checked)",
  "Project Handover",
];

export default function AdminConsole({ lang }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [activeTab, setActiveTab] = useState<"engineers" | "inquiries" | "orders">("engineers");

  // Engineers state
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [editingEngineer, setEditingEngineer] = useState<Engineer | null>(null);
  const [engineerForm, setEngineerForm] = useState({
    name_en: "",
    name_ne: "",
    role_en: "",
    role_ne: "",
    exp: "5",
    spec_en: "",
    spec_ne: "",
    bio_en: "",
    bio_ne: "",
    qualifications_en: "",
    qualifications_ne: "",
    rating: 4.8,
    image: "E",
  });

  // Inquiries & Orders state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load backend data
  const loadEngineers = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API_BASE}/api/engineers`);
      if (res.ok) setEngineers(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const loadInquiries = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API_BASE}/api/inquiries`);
      if (res.ok) setInquiries(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const loadOrders = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API_BASE}/api/orders`);
      if (res.ok) setOrders(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadEngineers();
      loadInquiries();
      loadOrders();
    }
  }, [isAuthenticated]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert(lang === "en" ? "Incorrect Passcode!" : "गलत पासकोड!");
    }
  };

  // Engineer actions
  const handleEngineerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_BASE = import.meta.env.VITE_API_URL || "";
    const endpoint = editingEngineer ? `${API_BASE}/api/engineers/${editingEngineer.id}` : `${API_BASE}/api/engineers`;
    const method = editingEngineer ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(engineerForm),
      });

      if (!res.ok) throw new Error("Operation failed");

      alert(
        lang === "en"
          ? editingEngineer
            ? "Engineer details updated"
            : "New Engineer added successfully"
          : editingEngineer
          ? "इन्जिनियर विवरण अपडेट भयो"
          : "नयाँ इन्जिनियर सफलतापूर्वक थपियो"
      );

      // Reset form
      setEditingEngineer(null);
      setEngineerForm({
        name_en: "",
        name_ne: "",
        role_en: "",
        role_ne: "",
        exp: "5",
        spec_en: "",
        spec_ne: "",
        bio_en: "",
        bio_ne: "",
        qualifications_en: "",
        qualifications_ne: "",
        rating: 4.8,
        image: "E",
      });

      loadEngineers();
      // Dispatch global update event to trigger home section team re-render
      window.dispatchEvent(new Event("engineers-updated"));
    } catch (err) {
      console.error(err);
      alert("Error saving engineer profile.");
    }
  };

  const startEditEngineer = (eng: Engineer) => {
    setEditingEngineer(eng);
    setEngineerForm({
      name_en: eng.name_en,
      name_ne: eng.name_ne,
      role_en: eng.role_en,
      role_ne: eng.role_ne,
      exp: eng.exp,
      spec_en: eng.spec_en,
      spec_ne: eng.spec_ne,
      bio_en: eng.bio_en || "",
      bio_ne: eng.bio_ne || "",
      qualifications_en: eng.qualifications_en || "",
      qualifications_ne: eng.qualifications_ne || "",
      rating: eng.rating,
      image: eng.image || "E",
    });
  };

  const deleteEngineer = async (id: number) => {
    if (!confirm(lang === "en" ? "Are you sure you want to delete this engineer?" : "के तपाईं यो इन्जिनियर हटाउन निश्चित हुनुहुन्छ?")) return;

    try {
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API_BASE}/api/engineers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      alert(lang === "en" ? "Engineer profile deleted" : "इन्जिनियर प्रोफाइल हटाइयो");
      loadEngineers();
      window.dispatchEvent(new Event("engineers-updated"));
    } catch (err) {
      console.error(err);
      alert("Error deleting engineer.");
    }
  };

  // Inquiry update stage
  const updateInquiryStage = async (id: number, newStage: string) => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API_BASE}/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_stage: newStage }),
      });

      if (!res.ok) throw new Error("Update failed");
      alert(lang === "en" ? "Milestone updated successfully" : "माइलस्टोन सफलतापूर्वक अपडेट भयो");
      loadInquiries();
    } catch (err) {
      console.error(err);
      alert("Error updating inquiry stage.");
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="bg-slate-50 py-24 min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0a2540] text-white text-xl font-bold">
              🔐
            </div>
            <h2 className="mt-4 text-xl font-black text-[#0a2540]">
              {lang === "en" ? "Admin Console Login" : "एडमिन प्यानल लगइन"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {lang === "en"
                ? "Enter security passcode to manage engineering team and inquiries."
                : "इन्जिनियरिङ्ग टोली र सोधपुछ व्यवस्थित गर्न सुरक्षा पासकोड राख्नुहोस्।"}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                {lang === "en" ? "Enter Passcode" : "पासकोड राख्नुहोस्"}
              </label>
              <input
                required
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0a2540] focus:bg-white focus:ring-2 focus:ring-[#0a2540]/10"
                placeholder="Passcode (hint: admin123)"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#0a2540] py-3 text-sm font-semibold text-white transition hover:bg-[#1e6091]"
            >
              {lang === "en" ? "Unlock Console" : "अनलक गर्नुहोस्"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-16 min-h-screen">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0a2540] flex items-center gap-2">
              🛠️ {lang === "en" ? "Enterprise Admin Console" : "इन्टरप्राइज एडमिन कन्सोल"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {lang === "en"
                ? "Manage engineers, track live municipal approvals, and review commerce orders."
                : "इन्जिनियरहरू व्यवस्थापन गर्नुहोस्, नगरपालिका स्वीकृति ट्र्याक गर्नुहोस्, र अर्डरहरू हेर्नुहोस्।"}
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex rounded-lg border border-slate-200 bg-white p-1 text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveTab("engineers")}
              className={`rounded-md px-4 py-2 transition-all ${
                activeTab === "engineers" ? "bg-[#0a2540] text-white" : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              👨‍💻 {lang === "en" ? "Engineers CRUD" : "इन्जिनियर व्यवस्थापन"}
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`rounded-md px-4 py-2 transition-all ${
                activeTab === "inquiries" ? "bg-[#0a2540] text-white" : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              📋 {lang === "en" ? "Inquiries / Tracking" : "सोधपुछ र ट्र्याकिङ"}
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`rounded-md px-4 py-2 transition-all ${
                activeTab === "orders" ? "bg-[#0a2540] text-white" : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              🛒 {lang === "en" ? "Shop Orders" : "शप अर्डरहरू"}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "engineers" && (
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Add/Edit Form */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a2540] border-b pb-3 mb-4">
                  {editingEngineer
                    ? lang === "en"
                      ? "Edit Engineer Details"
                      : "इन्जिनियर विवरण सम्पादन"
                    : lang === "en"
                    ? "Add New Engineer"
                    : "नयाँ इन्जिनियर थप्नुहोस्"}
                </h3>

                <form onSubmit={handleEngineerSubmit} className="space-y-4">
                  <div className="grid gap-4 grid-cols-2">
                    <div>
                      <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Name (English)</label>
                      <input
                        required
                        type="text"
                        value={engineerForm.name_en}
                        onChange={(e) => setEngineerForm({ ...engineerForm, name_en: e.target.value })}
                        className="w-full rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                        placeholder="e.g. Er. Sunil Thapa"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Name (Nepali)</label>
                      <input
                        required
                        type="text"
                        value={engineerForm.name_ne}
                        onChange={(e) => setEngineerForm({ ...engineerForm, name_ne: e.target.value })}
                        className="w-full rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                        placeholder="जस्तै: ई. सुनिल थापा"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-2">
                    <div>
                      <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Role (English)</label>
                      <input
                        required
                        type="text"
                        value={engineerForm.role_en}
                        onChange={(e) => setEngineerForm({ ...engineerForm, role_en: e.target.value })}
                        className="w-full rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                        placeholder="e.g. Structural Designer"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Role (Nepali)</label>
                      <input
                        required
                        type="text"
                        value={engineerForm.role_ne}
                        onChange={(e) => setEngineerForm({ ...engineerForm, role_ne: e.target.value })}
                        className="w-full rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                        placeholder="जस्तै: संरचनात्मक डिजाइनर"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-3">
                    <div>
                      <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Experience (Yrs)</label>
                      <input
                        required
                        type="number"
                        value={engineerForm.exp}
                        onChange={(e) => setEngineerForm({ ...engineerForm, exp: e.target.value })}
                        className="w-full rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Rating</label>
                      <input
                        required
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={engineerForm.rating}
                        onChange={(e) => setEngineerForm({ ...engineerForm, rating: Number(e.target.value) })}
                        className="w-full rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Initials Avatar</label>
                      <input
                        required
                        type="text"
                        maxLength={1}
                        value={engineerForm.image}
                        onChange={(e) => setEngineerForm({ ...engineerForm, image: e.target.value.toUpperCase() })}
                        className="w-full rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                        placeholder="S"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Specialization (English)</label>
                    <input
                      type="text"
                      value={engineerForm.spec_en}
                      onChange={(e) => setEngineerForm({ ...engineerForm, spec_en: e.target.value })}
                      className="w-full rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                      placeholder="e.g. Earthquake Resistant Structures"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Specialization (Nepali)</label>
                    <input
                      type="text"
                      value={engineerForm.spec_ne}
                      onChange={(e) => setEngineerForm({ ...engineerForm, spec_ne: e.target.value })}
                      className="w-full rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                      placeholder="जस्तै: भूकम्प प्रतिरोधी संरचना"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Qualifications (English)</label>
                    <input
                      type="text"
                      value={engineerForm.qualifications_en}
                      onChange={(e) => setEngineerForm({ ...engineerForm, qualifications_en: e.target.value })}
                      className="w-full rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                      placeholder="e.g. M.Sc. Structural Engineering (NEC No. 1234)"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Qualifications (Nepali)</label>
                    <input
                      type="text"
                      value={engineerForm.qualifications_ne}
                      onChange={(e) => setEngineerForm({ ...engineerForm, qualifications_ne: e.target.value })}
                      className="w-full rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                      placeholder="जस्तै: एम.एससी. स्ट्रक्चरल इन्जिनियरिङ्ग (NEC नं १२३४)"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Biography (English)</label>
                    <textarea
                      rows={3}
                      value={engineerForm.bio_en}
                      onChange={(e) => setEngineerForm({ ...engineerForm, bio_en: e.target.value })}
                      className="w-full resize-none rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Biography (Nepali)</label>
                    <textarea
                      rows={3}
                      value={engineerForm.bio_ne}
                      onChange={(e) => setEngineerForm({ ...engineerForm, bio_ne: e.target.value })}
                      className="w-full resize-none rounded bg-slate-50 border p-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    {editingEngineer && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEngineer(null);
                          setEngineerForm({
                            name_en: "",
                            name_ne: "",
                            role_en: "",
                            role_ne: "",
                            exp: "5",
                            spec_en: "",
                            spec_ne: "",
                            bio_en: "",
                            bio_ne: "",
                            qualifications_en: "",
                            qualifications_ne: "",
                            rating: 4.8,
                            image: "E",
                          });
                        }}
                        className="w-1/3 rounded-lg border border-slate-200 py-2.5 text-xs font-semibold hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className={`rounded-lg py-2.5 text-xs font-bold text-white transition ${
                        editingEngineer ? "w-2/3 bg-emerald-600 hover:bg-emerald-700" : "w-full bg-[#0a2540] hover:bg-[#1e6091]"
                      }`}
                    >
                      {editingEngineer ? "Save Changes" : "Create Profile"}
                    </button>
                  </div>
                </form>
              </div>

              {/* List View */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a2540] border-b pb-3 mb-4">
                  {lang === "en" ? "Active Engineers Registry" : "सक्रिय इन्जिनियर सूची"}
                </h3>

                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-2.5">Avatar</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th className="text-center">Exp</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {engineers.map((eng) => (
                      <tr key={eng.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="py-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a2540] text-[10px] font-bold text-white uppercase">
                            {eng.image || eng.name_en[0]}
                          </span>
                        </td>
                        <td className="font-semibold text-slate-900">{eng.name_en}</td>
                        <td className="text-slate-500 font-medium">{eng.role_en}</td>
                        <td className="text-center font-bold text-slate-700">{eng.exp} yr</td>
                        <td className="text-center">
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => startEditEngineer(eng)}
                              className="rounded bg-blue-50 border border-blue-200 px-2 py-1 text-[10px] font-bold text-[#1e6091] hover:bg-blue-100"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteEngineer(eng.id)}
                              className="rounded bg-red-50 border border-red-200 px-2 py-1 text-[10px] font-bold text-red-600 hover:bg-red-100"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "inquiries" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a2540] border-b pb-3 mb-4">
                {lang === "en" ? "Project Inquiries Tracker System" : "परियोजना सोधपुछ ट्र्याकिङ सूची"}
              </h3>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-slate-400 font-semibold">
                  No inquiries logged in the system.
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-2.5">Inquiry No.</th>
                      <th>Client Name</th>
                      <th>Contact</th>
                      <th>Location</th>
                      <th>Category</th>
                      <th>Active Stage</th>
                      <th className="text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="py-3 font-mono font-bold text-slate-900 tracking-wider">
                          {inq.inquiry_number}
                        </td>
                        <td className="font-bold text-slate-800">{inq.owner_name}</td>
                        <td className="text-slate-600 font-medium">
                          {inq.contact}
                          <span className="block text-[10px] text-slate-400">{inq.email}</span>
                        </td>
                        <td className="text-slate-600 font-medium">{inq.address}</td>
                        <td className="font-semibold text-[#1e6091]">{inq.project_type}</td>
                        <td>
                          <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-100">
                            {inq.current_stage}
                          </span>
                        </td>
                        <td className="text-right py-3">
                          <select
                            value={inq.current_stage}
                            onChange={(e) => updateInquiryStage(inq.id, e.target.value)}
                            className="rounded border border-slate-200 bg-slate-50 p-1 text-[11px] font-semibold text-slate-700 outline-none focus:border-[#0a2540] focus:bg-white"
                          >
                            {stages.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a2540] border-b pb-3 mb-4">
                {lang === "en" ? "Express Shop Order Logs" : "एक्सप्रेस शप अर्डर विवरणहरू"}
              </h3>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-slate-400 font-semibold">
                  No commerce orders placed yet.
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-2.5">Order No.</th>
                      <th>Client Name</th>
                      <th>Contact Details</th>
                      <th>Items Purchased</th>
                      <th className="text-right">Total (NPR)</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="py-3.5 font-mono font-bold text-slate-900 tracking-wider">
                          {ord.order_number}
                        </td>
                        <td className="font-bold text-slate-800">{ord.owner_name}</td>
                        <td className="text-slate-600 font-medium">
                          {ord.contact}
                          <span className="block text-[10px] text-slate-450">{ord.address}</span>
                        </td>
                        <td className="py-3">
                          <ul className="list-disc pl-4 space-y-0.5">
                            {ord.items.map((item, idx) => (
                              <li key={idx} className="text-slate-500 font-medium">
                                {item.name} ({item.category}) x{item.quantity}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="text-right font-black text-slate-900">
                          Rs. {ord.total_price.toLocaleString()}
                        </td>
                        <td className="text-center">
                          <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-100">
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
