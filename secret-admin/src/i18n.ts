export type Lang = "en" | "ne";

type Translations = {
  [K in Lang]: {
    nav: { [k: string]: string };
    hero: {
      badge: string;
      title1: string;
      title2: string;
      title3: string;
      subtitle: string;
      cta1: string;
      cta2: string;
      stats: { value: string; label: string }[];
    };
    services: {
      heading: string;
      subheading: string;
      items: { key: string; title: string; desc: string }[];
    };
    packages: {
      heading: string;
      subheading: string;
      labels: { [k: string]: string };
      items: {
        key: string;
        name: string;
        tag: string;
        price: string;
        priceFrom: string;
        popular?: boolean;
        features: string[];
      }[];
      benefitsTitle: string;
      benefits: { title: string; desc: string }[];
    };
    process: {
      heading: string;
      subheading: string;
      steps: { no: string; title: string; desc: string }[];
    };
    projects: {
      heading: string;
      subheading: string;
      items: { title: string; type: string; location: string }[];
    };
    testimonials: {
      heading: string;
      subheading: string;
      items: { name: string; role: string; quote: string }[];
    };
    about: {
      heading: string;
      lead: string;
      body: string;
      points: string[];
      mission: { title: string; text: string };
      vision: { title: string; text: string };
    };
    contact: {
      heading: string;
      subheading: string;
      name: string;
      email: string;
      phone: string;
      service: string;
      message: string;
      send: string;
      services: string[];
      info: {
        title: string;
        addressLabel: string;
        address: string;
        phoneLabel: string;
        emailLabel: string;
        hoursLabel: string;
        hours: string;
      };
      common: { [k: string]: string };
    };
    footer: { [k: string]: string };
    common: { [k: string]: string };
  };
};

export const translations: Translations = {
  en: {
    // Nav
    nav: {
      home: "Home",
      services: "Services",
      packages: "Packages",
      about: "About",
      process: "Process",
      contact: "Contact",
      cta: "Get a Quote",
    },
    // Hero
    hero: {
      badge: "Nepal's Trusted Engineering Consultancy",
      title1: "Complete Construction",
      title2: "& Design Packages",
      title3: "Delivered Across Nepal",
      subtitle:
        "From full construction packages and municipal approvals to premium interior design and furniture — bundle or de-bundle exactly what you need. Serving every province of Nepal with engineering-grade quality.",
      cta1: "Download Full Package",
      cta2: "Request a Consultation",
      stats: [
        { value: "1200+", label: "Projects Delivered" },
        { value: "All 7", label: "Provinces Served" },
        { value: "18+ Yrs", label: "Engineering Experience" },
        { value: "98%", label: "Client Satisfaction" },
      ],
    },
    // Services
    services: {
      heading: "What We Deliver",
      subheading:
        "End-to-end engineering and design solutions, packaged the way you want them.",
      items: [
        {
          key: "construction",
          title: "Full Construction Package",
          desc: "Complete structural, architectural and on-site execution package — drawings, BOQ, supervision, handover.",
        },
        {
          key: "materials",
          title: "Building Materials",
          desc: "Cement, steel, aggregates, bricks, finishing materials and more — sourced directly from certified suppliers.",
        },
        {
          key: "municipal",
          title: "Municipal Package",
          desc: "Building permit, Naksa passing, municipality coordination, occupancy certificate and all local approvals.",
        },
        {
          key: "interior",
          title: "Interior Design",
          desc: "Concept, 3D visualization, working drawings, material specifications and turnkey interior execution.",
        },
        {
          key: "furniture",
          title: "Interior Furniture",
          desc: "Modular kitchen, wardrobes, custom furniture, hospitality and home furniture — manufactured and installed.",
        },
        {
          key: "bundle",
          title: "Bundle & De-bundle",
          desc: "Pick individual services or take the entire turnkey package. We customize scope, schedule and budget for you.",
        },
      ],
    },
    // Packages
    packages: {
      heading: "Ready-to-Download Packages",
      subheading:
        "Three professionally engineered packages. Download the full package or request a custom scope — we deliver across Nepal.",
      labels: {
        full: "Full Package",
        standard: "Standard",
        custom: "Custom",
        mostPopular: "Most Popular",
        downloadPdf: "Download PDF",
        requestCustom: "Request Custom Quote",
        includes: "What's included",
      },
      items: [
        {
          key: "basic",
          name: "Essential Package",
          tag: "For homeowners & small builds",
          price: "NPR 1,20,000",
          priceFrom: "starting from",
          features: [
            "Architectural drawings (2D)",
            "Structural design & BOQ",
            "Municipal drawing submission",
            "Material estimation sheet",
            "1 site visit & supervision",
            "Email support",
          ],
        },
        {
          key: "standard",
          name: "Complete Package",
          tag: "For residential & commercial",
          price: "NPR 3,50,000",
          priceFrom: "starting from",
          popular: true,
          features: [
            "3D architectural design + walkthrough",
            "Full structural & MEP design",
            "Municipal permit & Naksa",
            "Detailed BOQ + vendor list",
            "Interior concept + 3D views",
            "Custom furniture design",
            "Project management (up to 12 months)",
            "Priority phone & on-site support",
          ],
        },
        {
          key: "premium",
          name: "Turnkey Package",
          tag: "Full hand-over, zero hassle",
          price: "On Request",
          priceFrom: "tailored quote",
          features: [
            "Everything in Complete Package",
            "All building materials supplied",
            "Full construction execution",
            "Interior design + execution",
            "Custom furniture manufacturing",
            "Dedicated project manager",
            "Municipality & compliance handling",
            "5-year structural warranty",
            "Lifetime design support",
          ],
        },
      ],
      benefitsTitle: "Why our packages work",
      benefits: [
        {
          title: "Pan-Nepal Delivery",
          desc: "We deliver and execute projects in all 7 provinces, including remote districts.",
        },
        {
          title: "Transparent Pricing",
          desc: "No hidden costs. Detailed BOQ provided upfront, every line item explained.",
        },
        {
          title: "Bundle or De-bundle",
          desc: "Take the whole package or pick only what you need. Fully flexible scope.",
        },
        {
          title: "Certified Engineers",
          desc: "Nepal Engineering Council registered team with 18+ years of field experience.",
        },
      ],
    },
    // Process
    process: {
      heading: "How We Work",
      subheading: "A clear, professional process from first call to final handover.",
      steps: [
        {
          no: "01",
          title: "Consultation",
          desc: "Share your requirement — site, budget and timeline. We listen, advise and plan.",
        },
        {
          no: "02",
          title: "Package Selection",
          desc: "Pick a ready package or let us design a custom bundled scope just for you.",
        },
        {
          no: "03",
          title: "Design & Approvals",
          desc: "Architectural, structural, interior and municipal drawings prepared and submitted.",
        },
        {
          no: "04",
          title: "Execution & Delivery",
          desc: "Construction, materials, interiors and furniture — managed end-to-end, on time.",
        },
      ],
    },
    // Projects
    projects: {
      heading: "Featured Projects",
      subheading: "A glimpse of work delivered across Nepal.",
      items: [
        {
          title: "Residential Villa — Bhaisepati",
          type: "Full Turnkey",
          location: "Lalitpur",
        },
        {
          title: "Hospitality Interior — Pokhara",
          type: "Interior + Furniture",
          location: "Gandaki",
        },
        {
          title: "Commercial Complex — Biratnagar",
          type: "Construction + Municipal",
          location: "Province 1",
        },
        {
          title: "Apartment Block — Butwal",
          type: "Complete Package",
          location: "Lumbini",
        },
      ],
    },
    // Testimonials
    testimonials: {
      heading: "What Our Clients Say",
      subheading: "Trusted by homeowners, businesses and developers across Nepal.",
      items: [
        {
          name: "Rajesh Shrestha",
          role: "Homeowner, Kathmandu",
          quote:
            "From municipal permits to interior furniture, Express Engineering handled everything. Truly turnkey and professional.",
        },
        {
          name: "Sita Adhikari",
          role: "Boutique Owner, Pokhara",
          quote:
            "Beautiful interior design with custom furniture. The team was responsive, on time, and the pricing was transparent.",
        },
        {
          name: "Hari Bhattarai",
          role: "Developer, Butwal",
          quote:
            "We've done 4 projects with them. Their bundled package saves us time and money. Highly recommended.",
        },
      ],
    },
    // About
    about: {
      heading: "About Express Engineering Consultancy",
      lead:
        "We are a Nepal-based engineering consultancy delivering integrated construction, material, municipal, interior and furniture solutions — under one roof.",
      body:
        "Founded with a vision to make professional engineering accessible to every Nepali homeowner and business, Express Engineering Consultancy has grown into a pan-Nepal service brand. Our registered engineers, architects, interior designers and project managers work as one team — bundling expertise so you don't have to coordinate multiple vendors.",
      points: [
        "ISO 9001:2015 Quality Management Certified",
        "Nepal Engineering Council registered firm",
        "In-house design, execution & furniture teams",
        "Projects delivered across all 7 provinces",
        "Transparent BOQ, contracts and timelines",
        "Strong network of certified material suppliers",
        "Dedicated post-handover support",
      ],
      mission: {
        title: "Our Mission",
        text: "To deliver world-class engineering, design and construction services that are accessible, transparent and reliable — for every client, in every corner of Nepal.",
      },
      vision: {
        title: "Our Vision",
        text: "To be Nepal's most trusted single-window engineering consultancy — where every dream build comes with engineering integrity, design excellence and complete peace of mind.",
      },
    },
    // Contact
    contact: {
      heading: "Get in Touch",
      subheading:
        "Tell us about your project. We'll respond within one business day.",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      service: "Service Required",
      message: "Project Details",
      send: "Send Request",
      services: [
        "Full Construction Package",
        "Building Materials",
        "Municipal Package",
        "Interior Design",
        "Interior Furniture",
        "Bundle / Custom",
      ],
      info: {
        title: "Contact Information",
        addressLabel: "Head Office",
        address: "Urlabari, Morang, Nepal",
        phoneLabel: "Phone",
        emailLabel: "Email",
        hoursLabel: "Working Hours",
        hours: "Sun – Fri, 9:00 AM – 6:00 PM",
      },
      common: {
        callNow: "Call Now",
        whatsapp: "WhatsApp",
      },
    },
    // Footer
    footer: {
      tagline: "Complete construction, design and material solutions — bundled for Nepal.",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact",
      newsletter: "Subscribe to our newsletter for project tips, offers and updates.",
      subscribe: "Subscribe",
      yourEmail: "Your email",
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
    },
    // Common
    common: {
      learnMore: "Learn more",
      readMore: "Read more",
      download: "Download",
      callNow: "Call Now",
      whatsapp: "WhatsApp",
    },
  },
  ne: {
    nav: {
      home: "गृहपृष्ठ",
      services: "सेवाहरू",
      packages: "प्याकेजहरू",
      about: "हाम्रो बारेमा",
      process: "प्रक्रिया",
      contact: "सम्पर्क",
      cta: "मूल्य जान्नुहोस्",
    },
    hero: {
      badge: "नेपालको भरपर्दो इन्जिनियरिङ्ग परामर्श सेवा",
      title1: "पूर्ण निर्माण",
      title2: "र डिजाइन प्याकेज",
      title3: "नेपालभरि उपलब्ध",
      subtitle:
        "पूर्ण निर्माण प्याकेज, नगरपालिका स्वीकृति, प्रिमियम इन्टेरियर डिजाइन र फर्निचर — तपाईंलाई चाहिने जति बण्डल वा डि-बण्डल गर्नुहोस्। नेपालका सबै प्रदेशमा इन्जिनियरिङ्ग-स्तरको गुणस्तरसहित सेवा।",
      cta1: "पूर्ण प्याकेज डाउनलोड गर्नुहोस्",
      cta2: "परामर्श लिनुहोस्",
      stats: [
        { value: "१२००+", label: "सम्पन्न आयोजना" },
        { value: "सबै ७", label: "प्रदेशमा सेवा" },
        { value: "१८+ वर्ष", label: "अनुभव" },
        { value: "९८%", label: "ग्राहक सन्तुष्टि" },
      ],
    },
    services: {
      heading: "हामीले प्रदान गर्ने सेवाहरू",
      subheading:
        "इन्जिनियरिङ्ग र डिजाइनको एकीकृत समाधान — तपाईंको आवश्यकता अनुसार प्याकेजमा।",
      items: [
        {
          key: "construction",
          title: "पूर्ण निर्माण प्याकेज",
          desc: "पूर्ण संरचनात्मक, वास्तुशिल्प र स्थलगत कार्यान्वयन प्याकेज — ड्रइङ्ग, BOQ, सुपरभिजन, हस्तान्तरण।",
        },
        {
          key: "materials",
          title: "निर्माण सामग्री",
          desc: "सिमेन्ट, छड, गिट्टी, इँटा, फिनिसिङ्ग सामग्री — प्रमाणित आपूर्तिकर्ताबाट सीधै।",
        },
        {
          key: "municipal",
          title: "नगरपालिका प्याकेज",
          desc: "भवन अनुमति, नक्सा पास, नगरपालिका समन्वय, अधिभोग प्रमाणपत्र र सबै स्थानीय स्वीकृति।",
        },
        {
          key: "interior",
          title: "इन्टेरियर डिजाइन",
          desc: "अवधारणा, ३D भिजुअलाइजेशन, कार्यान्वयन ड्रइङ्ग, सामग्री विशिष्टता र टर्नकी इन्टेरियर।",
        },
        {
          key: "furniture",
          title: "इन्टेरियर फर्निचर",
          desc: "मोड्युलर किचन, वार्डरोब, कस्टम फर्निचर, होस्पिटालिटी र घरायसी फर्निचर — निर्माण र जडान।",
        },
        {
          key: "bundle",
          title: "बण्डल र डि-बण्डल",
          desc: "छुट्टाछुट्टै सेवा लिनुहोस् वा पूरा टर्नकी प्याकेज लिनुहोस्। स्कोप, समय र बजेट हामी अनुकूलित गर्छौं।",
        },
      ],
    },
    packages: {
      heading: "डाउनलोडका लागि तयार प्याकेजहरू",
      subheading:
        "तीनवटा व्यावसायिक रूपमा तयार प्याकेज। पूरा प्याकेज डाउनलोड गर्नुहोस् वा कस्टम स्कोप माग्नुहोस् — हामी नेपालभरि डेलिभर गर्छौं।",
      labels: {
        full: "पूर्ण प्याकेज",
        standard: "मानक",
        custom: "कस्टम",
        mostPopular: "सबैभन्दा लोकप्रिय",
        downloadPdf: "PDF डाउनलोड",
        requestCustom: "कस्टम मूल्य माग्नुहोस्",
        includes: "के-के समावेश छ",
      },
      items: [
        {
          key: "basic",
          name: "आधारभूत प्याकेज",
          tag: "घरधनी र साना भवनका लागि",
          price: "रु. १,२०,०००",
          priceFrom: "सुरुवात मूल्य",
          features: [
            "वास्तुशिल्प ड्रइङ्ग (२D)",
            "संरचनात्मक डिजाइन र BOQ",
            "नगरपालिका ड्रइङ्ग पेश",
            "सामग्री अनुमान पत्र",
            "१ पटक साइट भ्रमण र सुपरभिजन",
            "इमेल सहयोग",
          ],
        },
        {
          key: "standard",
          name: "पूर्ण प्याकेज",
          tag: "आवासीय र व्यावसायिकका लागि",
          price: "रु. ३,५०,०००",
          priceFrom: "सुरुवात मूल्य",
          popular: true,
          features: [
            "३D वास्तुशिल्प डिजाइन + वाकथ्रू",
            "पूर्ण संरचनात्मक र MEP डिजाइन",
            "नगरपालिका अनुमति र नक्सा पास",
            "विस्तृत BOQ + बिक्रेता सूची",
            "इन्टेरियर अवधारणा + ३D दृश्य",
            "कस्टम फर्निचर डिजाइन",
            "परियोजना व्यवस्थापन (१२ महिनासम्म)",
            "प्राथमिकता फोन र साइट सहयोग",
          ],
        },
        {
          key: "premium",
          name: "टर्नकी प्याकेज",
          tag: "पूर्ण हस्तान्तरण, शून्य झन्झट",
          price: "अनुरोधमा",
          priceFrom: "अनुकूलित मूल्य",
          features: [
            "पूर्ण प्याकेजमा भएका सबै सेवा",
            "सबै निर्माण सामग्री आपूर्ति",
            "पूर्ण निर्माण कार्यान्वयन",
            "इन्टेरियर डिजाइन + कार्यान्वयन",
            "कस्टम फर्निचर निर्माण",
            "समर्पित परियोजना प्रबन्धक",
            "नगरपालिका र अनुपालन व्यवस्थापन",
            "५ वर्ष संरचनात्मक वारेन्टी",
            "आजीवन डिजाइन सहयोग",
          ],
        },
      ],
      benefitsTitle: "हाम्रा प्याकेज किन राम्रो",
      benefits: [
        {
          title: "प्यान-नेपाल डेलिभरी",
          desc: "हामी नेपालका सबै ७ प्रदेश र दुर्गम जिल्लाहरूमा पनि काम गर्छौं।",
        },
        {
          title: "पारदर्शी मूल्य",
          desc: "लुकेको शुल्क छैन। BOQ पहिल्यै दिइन्छ, हरेक लाइन स्पष्ट हुन्छ।",
        },
        {
          title: "बण्डल वा डि-बण्डल",
          desc: "पूरा प्याकेज लिनुहोस् वा आवश्यक सेवा मात्र — पूर्ण लचिलो स्कोप।",
        },
        {
          title: "प्रमाणित इन्जिनियर",
          desc: "नेपाल इन्जिनियरिङ्ग काउन्सिलमा दर्ता भएको टोली, १८+ वर्षको अनुभव।",
        },
      ],
    },
    process: {
      heading: "हामी कसरी काम गर्छौं",
      subheading: "पहिलो कलदेखि अन्तिम हस्तान्तरणसम्म स्पष्ट र व्यावसायिक प्रक्रिया।",
      steps: [
        {
          no: "०१",
          title: "परामर्श",
          desc: "आफ्नो आवश्यकता, साइट, बजेट र समयसीमा बताउनुहोस्। हामी सुन्छौं, सल्लाह दिन्छौं।",
        },
        {
          no: "०२",
          title: "प्याकेज छनोट",
          desc: "तयार प्याकेज छान्नुहोस् वा हामी तपाईंका लागि कस्टम स्कोप डिजाइन गरौं।",
        },
        {
          no: "०३",
          title: "डिजाइन र स्वीकृति",
          desc: "वास्तुशिल्प, संरचनात्मक, इन्टेरियर र नगरपालिका ड्रइङ्ग तयार र पेश।",
        },
        {
          no: "०४",
          title: "कार्यान्वयन र डेलिभरी",
          desc: "निर्माण, सामग्री, इन्टेरियर र फर्निचर — सबै एकै टोलीले, समयमै।",
        },
      ],
    },
    projects: {
      heading: "विशेष आयोजनाहरू",
      subheading: "नेपालभरि सम्पन्न भएका केही कामहरूको झलक।",
      items: [
        {
          title: "आवासीय भिला — भैंसेपाटी",
          type: "पूर्ण टर्नकी",
          location: "ललितपुर",
        },
        {
          title: "होस्पिटालिटी इन्टेरियर — पोखरा",
          type: "इन्टेरियर + फर्निचर",
          location: "गण्डकी",
        },
        {
          title: "व्यावसायिक कम्प्लेक्स — विराटनगर",
          type: "निर्माण + नगरपालिका",
          location: "प्रदेश १",
        },
        {
          title: "अपार्टमेन्ट ब्लक — बुटवल",
          type: "पूर्ण प्याकेज",
          location: "लुम्बिनी",
        },
      ],
    },
    testimonials: {
      heading: "हाम्रा ग्राहकहरू के भन्छन्",
      subheading:
        "नेपालभरिका घरधनी, व्यवसायी र डेभलपरहरूको विश्वास।",
      items: [
        {
          name: "राजेश श्रेष्ठ",
          role: "घरधनी, काठमाडौं",
          quote:
            "नगरपालिका अनुमतिदेखि इन्टेरियर फर्निचरसम्म सबै कुरा एक्सप्रेस इन्जिनियरिङ्गले सम्हाल्यो। साँच्चै टर्नकी र व्यावसायिक।",
        },
        {
          name: "सीता अधिकारी",
          role: "बुटिक मालिक, पोखरा",
          quote:
            "सुन्दर इन्टेरियर डिजाइन र कस्टम फर्निचर। टोली समयमै आयो, मूल्य पारदर्शी थियो।",
        },
        {
          name: "हरि भट्टराई",
          role: "डेभलपर, बुटवल",
          quote:
            "हामीले ४ वटा आयोजना उनीहरूसँग गर्‍यौं। बण्डल प्याकेजले समय र पैसा बचत गर्‍यो। प्रबल सिफारिस।",
        },
      ],
    },
    about: {
      heading: "एक्सप्रेस इन्जिनियरिङ्ग परामर्शको बारेमा",
      lead:
        "हामी नेपालमा आधारित इन्जिनियरिङ्ग परामर्श सेवा हौं जसले निर्माण, सामग्री, नगरपालिका, इन्टेरियर र फर्निचरको एकीकृत समाधान एउटै छानामुनि प्रदान गर्छ।",
      body:
        "हरेक नेपाली घरधनी र व्यवसायसम्म व्यावसायिक इन्जिनियरिङ्ग सेवा पुर्‍याउने दृष्टिबाट स्थापित, एक्सप्रेस इन्जिनियरिङ्ग परामर्श प्यान-नेपाल सेवा ब्रान्डमा विकसित भएको छ। हाम्रो दर्तावद्ध इन्जिनियर, वास्तुकार, इन्टेरियर डिजाइनर र परियोजना प्रबन्धकहरू एकै टोलीको रूपमा काम गर्छन्।",
      points: [
        "आईएसओ ९००१:२०१५ गुणस्तर व्यवस्थापन प्रमाणित",
        "नेपाल इन्जिनियरिङ्ग काउन्सिलमा दर्ता",
        "आन्तरिक डिजाइन, कार्यान्वयन र फर्निचर टोली",
        "सबै ७ प्रदेशमा आयोजना सम्पन्न",
        "पारदर्शी BOQ, सम्झौता र समयसीमा",
        "प्रमाणित सामग्री आपूर्तिकर्ताहरूको सञ्जाल",
        "हस्तान्तरण पछिको समर्पित सहयोग",
      ],
      mission: {
        title: "हाम्रो उद्देश्य",
        text: "विश्वस्तरीय इन्जिनियरिङ्ग, डिजाइन र निर्माण सेवा — पहुँचयोग्य, पारदर्शी र भरपर्दो — हरेक ग्राहक र नेपालको हरेक कुनाका लागि।",
      },
      vision: {
        title: "हाम्रो दृष्टि",
        text: "नेपालको सबैभन्दा भरपर्दो एकल-विन्डो इन्जिनियरिङ्ग परामर्श सेवा बन्ने — जहाँ हरेक सपनाको निर्माणसँग इन्जिनियरिङ्ग सत्यनिष्ठा, डिजाइन उत्कृष्टता र पूर्ण मनशान्ति आउँछ।",
      },
    },
    contact: {
      heading: "सम्पर्कमा आउनुहोस्",
      subheading:
        "आफ्नो आयोजनाको बारेमा बताउनुहोस्। हामी एक कार्यदिनभित्र जवाफ दिन्छौं।",
      name: "पूरा नाम",
      email: "इमेल ठेगाना",
      phone: "फोन नम्बर",
      service: "आवश्यक सेवा",
      message: "आयोजनाको विवरण",
      send: "अनुरोध पठाउनुहोस्",
      services: [
        "पूर्ण निर्माण प्याकेज",
        "निर्माण सामग्री",
        "नगरपालिका प्याकेज",
        "इन्टेरियर डिजाइन",
        "इन्टेरियर फर्निचर",
        "बण्डल / कस्टम",
      ],
      info: {
        title: "सम्पर्क जानकारी",
        addressLabel: "प्रधान कार्यालय",
        address: "उर्लाबारी, मोरङ, नेपाल",
        phoneLabel: "फोन",
        emailLabel: "इमेल",
        hoursLabel: "कार्य समय",
        hours: "आइत – शुक्र, बिहान ९ बजे – साँझ ६ बजे",
      },
      common: {
        callNow: "अहिलै फोन गर्नुहोस्",
        whatsapp: "व्हाट्सएप",
      },
    },
    footer: {
      tagline:
        "पूर्ण निर्माण, डिजाइन र सामग्री समाधान — नेपालका लागि बण्डलमा।",
      quickLinks: "द्रुत लिङ्कहरू",
      services: "सेवाहरू",
      contact: "सम्पर्क",
      newsletter:
        "आयोजना सुझाव, अफर र अपडेटका लागि हाम्रो न्यूजलेटर सदस्य बन्नुहोस्।",
      subscribe: "सदस्य बन्नुहोस्",
      yourEmail: "तपाईंको इमेल",
      rights: "सर्वाधिकार सुरक्षित।",
      privacy: "गोपनीयता",
      terms: "सर्तहरू",
    },
    common: {
      learnMore: "थप जान्नुहोस्",
      readMore: "अगाडि पढ्नुहोस्",
      download: "डाउनलोड",
      callNow: "अहिलै फोन गर्नुहोस्",
      whatsapp: "व्हाट्सएप",
    },
  },
} as const;
