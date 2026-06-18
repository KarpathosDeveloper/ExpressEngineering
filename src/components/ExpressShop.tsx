import { useState } from "react";
import type { Lang } from "../i18n";

type Props = { lang: Lang };

type Product = {
  id: number;
  name: string;
  category: "Construction Material" | "Interior Design";
  price: number;
  unit: string;
  vendor: string;
  rating: number;
  imageIcon: string;
  desc: string;
};

const products: Product[] = [
  // Construction Materials
  {
    id: 1,
    name: "Shivam OPC Cement (Grade 43)",
    category: "Construction Material",
    price: 780,
    unit: "bag",
    vendor: "Shivam Cement Ltd.",
    rating: 4.8,
    imageIcon: "🧱",
    desc: "Premium grade Ordinary Portland Cement, ideal for high-strength RCC structural castings.",
  },
  {
    id: 2,
    name: "Jagdamba Fe 500D TMT Steel Rebar",
    category: "Construction Material",
    price: 98,
    unit: "kg",
    vendor: "Jagdamba Steels",
    rating: 4.9,
    imageIcon: "⛓️",
    desc: "Thermo-mechanically treated high-ductility steel rebar, seismic-resistant certified.",
  },
  {
    id: 3,
    name: "Red Clay Bricks (First Class)",
    category: "Construction Material",
    price: 16,
    unit: "piece",
    vendor: "Baneshwor Brick Industry",
    rating: 4.5,
    imageIcon: "🧱",
    desc: "Standard kiln-burned clay building bricks, uniform size and high compressive strength.",
  },
  {
    id: 4,
    name: "Washed River Sand (Fine Grade)",
    category: "Construction Material",
    price: 4200,
    unit: "tipper (m3)",
    vendor: "Trishuli Sand Aggregates",
    rating: 4.6,
    imageIcon: "⏳",
    desc: "Double-washed river sand, low silt content, ideal for plastering and concrete mix.",
  },
  // Interior Designs
  {
    id: 5,
    name: "Premium Italian Statuario Marble",
    category: "Interior Design",
    price: 650,
    unit: "sq. ft.",
    vendor: "Kathmandu Stone & Marble House",
    rating: 4.9,
    imageIcon: "💎",
    desc: "Luxury white Italian marble with elegant gray veining, polished finish for floors.",
  },
  {
    id: 6,
    name: "Modular Acrylic Kitchen Cabinet Set",
    category: "Interior Design",
    price: 185000,
    unit: "set",
    vendor: "Classic Kitchens & Decors",
    rating: 4.7,
    imageIcon: "🍳",
    desc: "Waterproof marine-plywood kitchen with soft-close acrylic drawers, built-in chimney space.",
  },
  {
    id: 7,
    name: "Modern Nordic LED Chandelier",
    category: "Interior Design",
    price: 14500,
    unit: "piece",
    vendor: "Nepal Lights & Fixtures",
    rating: 4.8,
    imageIcon: "💡",
    desc: "Adjustable 3-color tone warm-to-cool LED ceiling light, minimalist gold ring profile.",
  },
  {
    id: 8,
    name: "Handwoven Royal Woolen Carpet",
    category: "Interior Design",
    price: 38000,
    unit: "piece (6x9 ft)",
    vendor: "Himalayan Carpet Weavers",
    rating: 4.7,
    imageIcon: "🧶",
    desc: "100-knot pure Nepalese sheep wool rug with traditional organic dye designs.",
  },
];

type CartItem = {
  product: Product;
  quantity: number;
};

export default function ExpressShop({ lang }: Props) {
  const [activeCategory, setActiveCategory] = useState<"All" | "Construction Material" | "Interior Design">("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    // Auto open cart drawer for feedback
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: number, q: number) => {
    if (q <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.product.id === productId ? { ...item, quantity: q } : item))
      );
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    try {
      const itemsPayload = cart.map((item) => ({
        name: item.product.name,
        category: item.product.category,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const totalPrice = calculateTotal();

      const API_BASE = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner_name: checkoutForm.name,
          contact: checkoutForm.phone,
          address: checkoutForm.address,
          items: itemsPayload,
          total_price: totalPrice,
        }),
      });

      if (!response.ok) throw new Error("Order creation failed");

      await response.json();

      // Formulate WhatsApp message
      const formattedItems = cart
        .map((item) => `- ${item.product.name} x${item.quantity} (Rs. ${item.product.price * item.quantity})`)
        .join("\n");

      const text = `I want the Engineering Services from the Express Engineering.\n\n` +
        `*NEW EXPRESS SHOP ORDER Placed* 🛒\n\n` +
        `• *Client Name:* ${checkoutForm.name}\n` +
        `• *Contact:* ${checkoutForm.phone}\n` +
        `• *Delivery Address:* ${checkoutForm.address}\n\n` +
        `*Items:\n${formattedItems}*\n\n` +
        `• *Total Price:* Rs. ${totalPrice.toLocaleString()}\n\n` +
        `Please confirm our order delivery timeline and payment details.`;

      const whatsappUrl = `https://wa.me/9779810555494?text=${encodeURIComponent(text)}`;

      setOrderPlaced(true);
      setCart([]);
      setCheckoutForm({ name: "", phone: "", address: "" });

      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        setOrderPlaced(false);
        setIsCartOpen(false);
      }, 1200);
    } catch (err) {
      console.error(err);
      alert(lang === "en" ? "Checkout failed. Please try again." : "चेकआउट असफल भयो। कृपया फेरि प्रयास गर्नुहोस्।");
    }
  };

  const filteredProducts = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section id="express-shop" className="bg-[#fafaf7] py-20 lg:py-28 relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4a017]" />
              {lang === "en" ? "EXPRESS SHOP" : "एक्सप्रेस शप"}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {lang === "en" ? "Premium One-Door Supply Shop" : "प्रिमियम निर्माण र इन्टेरियर पसल"}
            </h2>
            <p className="mt-4 text-base text-slate-600">
              {lang === "en"
                ? "A certified multi-vendor marketplace sourcing construction materials and interior design products directly to project sites across Nepal."
                : "नेपालभरिका आयोजना स्थलहरूमा सीधै निर्माण सामग्री र इन्टेरियर उत्पादनहरू ढुवानी गर्ने प्रमाणित बहु-विक्रेता बजार।"}
            </p>
          </div>

          {/* Cart Status Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 rounded-xl bg-[#0a2540] text-white px-5 py-3 text-sm font-bold shadow-md hover:bg-[#1e6091] transition duration-200"
          >
            🛒 {lang === "en" ? "View Cart" : "बास्केट हेर्नुहोस्"}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#d4a017] text-xs font-black text-[#0a2540] shadow border-2 border-white animate-bounce">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Filter Navigation */}
        <div className="flex border-b border-slate-200 mb-8 text-sm font-semibold text-slate-500">
          <button
            onClick={() => setActiveCategory("All")}
            className={`border-b-2 px-5 py-3.5 transition-all ${
              activeCategory === "All"
                ? "border-[#0a2540] text-[#0a2540] font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            {lang === "en" ? "All Products" : "सबै उत्पादनहरू"}
          </button>
          <button
            onClick={() => setActiveCategory("Construction Material")}
            className={`border-b-2 px-5 py-3.5 transition-all ${
              activeCategory === "Construction Material"
                ? "border-[#0a2540] text-[#0a2540] font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            🧱 {lang === "en" ? "Construction Materials" : "निर्माण सामग्री"}
          </button>
          <button
            onClick={() => setActiveCategory("Interior Design")}
            className={`border-b-2 px-5 py-3.5 transition-all ${
              activeCategory === "Interior Design"
                ? "border-[#0a2540] text-[#0a2540] font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            🛋️ {lang === "en" ? "Interior Products" : "इन्टेरियर उत्पादनहरू"}
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-350 transition-all hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Visual Icon Box */}
                <div className="h-44 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-5xl transition-transform group-hover:scale-105 duration-350">
                  {p.imageIcon}
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {p.category === "Construction Material" ? "Material" : "Interior"}
                    </span>
                    <span className="text-[10px] text-[#1e6091] font-bold bg-blue-50/70 border border-blue-100/50 px-2 py-0.5 rounded">
                      ★ {p.rating.toFixed(1)}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {p.desc}
                  </p>
                  <div className="mt-3 text-[10px] font-semibold text-slate-500 bg-slate-50 border p-1.5 rounded">
                    🏭 {lang === "en" ? "Supplier:" : "विक्रेता:"} <span className="text-slate-800 font-bold">{p.vendor}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] block text-slate-450 uppercase font-medium">Price</span>
                  <span className="text-base font-black text-slate-900">
                    Rs. {p.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ {p.unit}</span>
                  </span>
                </div>
                <button
                  onClick={() => addToCart(p)}
                  className="rounded-lg bg-[#0a2540] text-white p-2.5 hover:bg-[#1e6091] transition active:scale-95"
                  title={lang === "en" ? "Add to Cart" : "बास्केटमा राख्नुहोस्"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Slider Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white p-6 shadow-2xl flex flex-col justify-between max-h-screen text-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-[#0a2540] flex items-center gap-2">
                🛒 {lang === "en" ? "Your Shopping Cart" : "तपाईंको शपिंग बास्केट"}
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
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

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-slate-400 font-semibold space-y-2">
                  <div className="text-3xl">🛍️</div>
                  <div>{lang === "en" ? "Your cart is empty" : "बास्केट खाली छ"}</div>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between items-center bg-slate-50 border border-slate-150 p-3.5 rounded-xl gap-3"
                  >
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-800 leading-tight">
                        {item.product.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {lang === "en" ? "Vendor:" : "विक्रेता:"} {item.product.vendor}
                      </span>
                      <span className="text-xs font-black text-slate-900 mt-1 block">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 border border-slate-200 rounded-lg bg-white p-0.5 text-xs font-semibold text-slate-700">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-slate-100 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-slate-100 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Form & Pricing */}
            {cart.length > 0 && (
              <div className="border-t border-slate-100 pt-4 space-y-4">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-500">
                    {lang === "en" ? "Estimated Subtotal" : "अनुमानित जम्मा"}
                  </span>
                  <span className="text-lg font-black text-[#0a2540]">
                    Rs. {calculateTotal().toLocaleString()}
                  </span>
                </div>

                {orderPlaced ? (
                  <div className="text-center py-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-sm font-bold text-emerald-700 block">
                      ✓ {lang === "en" ? "Order Logged Successfully!" : "अर्डर सफलतापूर्वक दर्ता भयो!"}
                    </span>
                    <span className="text-[10px] text-emerald-600 block mt-0.5">
                      {lang === "en" ? "Redirecting to WhatsApp..." : "व्हाट्सएपमा रिडिरेक्ट हुँदै..."}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleCheckout} className="space-y-2.5">
                    <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      {lang === "en" ? "Delivery / Owner Details" : "डेलिभरी र ग्राहक विवरण"}
                    </span>
                    <input
                      required
                      type="text"
                      placeholder={lang === "en" ? "Owner Full Name" : "ग्राहकको पूरा नाम"}
                      value={checkoutForm.name}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                    />
                    <input
                      required
                      type="tel"
                      placeholder={lang === "en" ? "Contact Mobile Number" : "सम्पर्क मोबाइल नम्बर"}
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                    />
                    <input
                      required
                      type="text"
                      placeholder={lang === "en" ? "Detailed Site Delivery Address" : "विस्तृत डेलिभरी ठेगाना"}
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-[#0a2540] focus:bg-white"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-[#0a2540] text-white py-3 text-sm font-bold hover:bg-[#1e6091] transition flex items-center justify-center gap-1.5 shadow"
                    >
                      <span>📦</span>
                      {lang === "en" ? "Submit Order & WhatsApp Invoice" : "अर्डर बुझाउनुहोस् र व्हाट्सएप चलाउनुहोस्"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
