import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isPostgres = !!process.env.DATABASE_URL;

let sqliteDb = null;
let pgPool = null;

if (isPostgres) {
  console.log("Database Mode: CLOUD POSTGRES (Supabase/Neon)");
  const pgModule = await import("pg");
  const pg = pgModule.default || pgModule;
  pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
} else {
  console.log("Database Mode: LOCAL SQLITE");
  const sqlite3Module = await import("sqlite3");
  const sqlite3 = sqlite3Module.default || sqlite3Module;
  const dbPath = path.resolve(__dirname, "express_consultancy.db");
  sqliteDb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Error opening SQLite database:", err.message);
    } else {
      console.log("Connected to the SQLite database at:", dbPath);
    }
  });
}

// Helper to convert SQLite "?" placeholders to Postgres "$1, $2, ..."
function translateQuery(sql) {
  if (!isPostgres) return sql;
  let count = 1;
  return sql.replace(/\?/g, () => `$${count++}`);
}

// Unified db wrapper
const db = {
  serialize(callback) {
    if (isPostgres) {
      callback();
    } else {
      sqliteDb.serialize(callback);
    }
  },

  all(sql, params, callback) {
    if (typeof params === "function") {
      callback = params;
      params = [];
    }
    if (isPostgres) {
      const pgSql = translateQuery(sql);
      pgPool.query(pgSql, params)
        .then((res) => callback(null, res.rows))
        .catch((err) => callback(err, null));
    } else {
      sqliteDb.all(sql, params, callback);
    }
  },

  get(sql, params, callback) {
    if (typeof params === "function") {
      callback = params;
      params = [];
    }
    if (isPostgres) {
      const pgSql = translateQuery(sql);
      pgPool.query(pgSql, params)
        .then((res) => callback(null, res.rows[0] || null))
        .catch((err) => callback(err, null));
    } else {
      sqliteDb.get(sql, params, callback);
    }
  },

  run(sql, params, callback) {
    if (typeof params === "function") {
      callback = params;
      params = [];
    }
    if (isPostgres) {
      let pgSql = translateQuery(sql);
      
      // If it's an INSERT, append RETURNING id to get the auto-increment value
      const isInsert = pgSql.trim().toUpperCase().startsWith("INSERT");
      if (isInsert && !pgSql.toUpperCase().includes("RETURNING")) {
        pgSql += " RETURNING id";
      }

      pgPool.query(pgSql, params)
        .then((res) => {
          const lastID = isInsert && res.rows[0] ? res.rows[0].id : null;
          const context = {
            lastID: lastID,
            changes: res.rowCount
          };
          if (callback) {
            callback.call(context, null);
          }
        })
        .catch((err) => {
          if (callback) callback(err);
        });
    } else {
      sqliteDb.run(sql, params, callback);
    }
  },

  prepare(sql) {
    if (isPostgres) {
      // Return a simulated statement runner for Postgres
      return {
        run(...params) {
          let cb = null;
          if (typeof params[params.length - 1] === "function") {
            cb = params.pop();
          }
          db.run(sql, params, cb);
        },
        finalize() {}
      };
    } else {
      return sqliteDb.prepare(sql);
    }
  }
};

initTables();

function initTables() {
  const serialType = isPostgres ? "SERIAL PRIMARY KEY" : "INTEGER PRIMARY KEY AUTOINCREMENT";
  const datetimeType = isPostgres ? "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" : "DATETIME DEFAULT CURRENT_TIMESTAMP";

  db.serialize(() => {
    // 1. Create Engineers Table
    db.run(
      `CREATE TABLE IF NOT EXISTS engineers (
        id ${serialType},
        name_en TEXT NOT NULL,
        name_ne TEXT NOT NULL,
        role_en TEXT NOT NULL,
        role_ne TEXT NOT NULL,
        exp TEXT NOT NULL,
        spec_en TEXT NOT NULL,
        spec_ne TEXT NOT NULL,
        bio_en TEXT,
        bio_ne TEXT,
        qualifications_en TEXT,
        qualifications_ne TEXT,
        rating REAL DEFAULT 4.8,
        image TEXT
      )`,
      (err) => {
        if (err) console.error("Error creating engineers table:", err);
        else seedEngineers();
      }
    );

    // 2. Create Inquiries Table (Updated for profile details & document upload)
    db.run(
      `CREATE TABLE IF NOT EXISTS inquiries (
        id ${serialType},
        inquiry_number TEXT UNIQUE NOT NULL,
        owner_name TEXT NOT NULL,
        contact TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        project_type TEXT NOT NULL,
        description TEXT,
        citizenship_no TEXT,
        site_area TEXT,
        lalpurja_file TEXT, -- Base64 encoded land certificate
        citizenship_file TEXT, -- Base64 encoded citizenship card
        site_photo TEXT, -- Base64 encoded site photo
        status TEXT DEFAULT 'active',
        current_stage TEXT DEFAULT 'Inquiry Received',
        created_at ${datetimeType}
      )`,
      (err) => {
        if (err) console.error("Error creating inquiries table:", err);
        else upgradeInquiriesTable();
      }
    );

    // 3. Create Orders Table
    db.run(
      `CREATE TABLE IF NOT EXISTS orders (
        id ${serialType},
        order_number TEXT UNIQUE NOT NULL,
        owner_name TEXT NOT NULL,
        contact TEXT NOT NULL,
        address TEXT NOT NULL,
        items TEXT NOT NULL,
        total_price INTEGER NOT NULL,
        status TEXT DEFAULT 'Pending',
        created_at ${datetimeType}
      )`,
      (err) => {
        if (err) console.error("Error creating orders table:", err);
      }
    );

    // 4. Create Products Table
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
        id ${serialType},
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price INTEGER NOT NULL,
        unit TEXT NOT NULL,
        vendor TEXT NOT NULL,
        rating REAL DEFAULT 4.8,
        image_icon TEXT,
        description TEXT
      )`,
      (err) => {
        if (err) console.error("Error creating products table:", err);
        else seedProducts();
      }
    );
  });
}

// In case the DB was already created, dynamically add the columns if missing
function upgradeInquiriesTable() {
  const columns = [
    { name: "citizenship_no", type: "TEXT" },
    { name: "site_area", type: "TEXT" },
    { name: "lalpurja_file", type: "TEXT" },
    { name: "citizenship_file", type: "TEXT" },
    { name: "site_photo", type: "TEXT" },
  ];

  columns.forEach((col) => {
    db.run(`ALTER TABLE inquiries ADD COLUMN ${col.name} ${col.type}`, (err) => {
      // Ignore errors caused by columns already existing
      if (err && !err.message.includes("duplicate column name") && !err.message.includes("already exists")) {
        console.error(`Error adding column ${col.name}:`, err.message);
      }
    });
  });
}

function seedEngineers() {
  db.get("SELECT COUNT(*) as count FROM engineers", [], (err, row) => {
    if (err) {
      console.error("Error checking engineer count:", err);
      return;
    }

    if (row && Number(row.count) === 0) {
      console.log("Seeding default engineers data...");
      const defaultEngineers = [
        {
          name_en: "Er. Suman K.C.",
          name_ne: "ई. सुमन के.सी.",
          role_en: "Principal Architect & Founder",
          role_ne: "प्रिन्सिपल आर्किटेक्ट र संस्थापक",
          exp: "22",
          spec_en: "Structural Design & Municipal Guidelines",
          spec_ne: "संरचनात्मक डिजाइन र नगरपालिका निर्देशिका",
          bio_en: "Er. Suman K.C. is a pioneer in structural engineering in Nepal. With over 22 years of experience, he has led the design and approvals of over 500 residential and commercial structures.",
          bio_ne: "ई. सुमन के.सी. नेपालमा संरचनात्मक इन्जिनियरिङ्गका अग्रणी हुन्। २२ वर्ष भन्दा बढीको अनुभवका साथ, उहाँले ५०० भन्दा बढी आवासीय र व्यावसायिक संरचनाहरूको डिजाइन र स्वीकृतिको नेतृत्व गर्नुभएको छ।",
          qualifications_en: "M.Sc. in Structural Engineering, Tribhuvan University. Registered with Nepal Engineering Council (NEC No. 4390 Civil).",
          qualifications_ne: "एम.एससी. स्ट्रक्चरल इन्जिनियरिङ्ग, त्रिभुवन विश्वविद्यालय। नेपाल इन्जिनियरिङ्ग काउन्सिलमा दर्ता (NEC नम्बर ४३९० सिभिल)।",
          rating: 4.9,
          image: "S",
        },
        {
          name_en: "Er. Anjali Sharma",
          name_ne: "ई. अञ्जली शर्मा",
          role_en: "Head of Interiors",
          role_ne: "इन्टेरियर विभाग प्रमुख",
          exp: "15",
          spec_en: "Interior Design & Bespoke Furniture Design",
          spec_ne: "इन्टेरियर डिजाइन र बेस्पोक फर्निचर डिजाइन",
          bio_en: "Anjali specializes in modern Nepalese fusion interior designs. She creates ergonomic spaces blending traditional art with minimalist aesthetics.",
          bio_ne: "अञ्जली आधुनिक नेपाली फ्युजन इन्टेरियर डिजाइनमा विशेषज्ञ हुन्। उहाँले परम्परागत कला र न्यूनतम सौन्दर्यको मिश्रण गर्दै एर्गोनोमिक स्पेसहरू सिर्जना गर्नुहुन्छ।",
          qualifications_en: "B.Arch, Pulchowk Campus. Member of Society of Nepalese Architects (SONA).",
          qualifications_ne: "बी.आर्क, पुल्चोक क्याम्पस। सोसाइटी अफ नेप्लिज आर्किटेक्ट्स (SONA) को सदस्य।",
          rating: 4.8,
          image: "A",
        },
        {
          name_en: "Er. Bikash Thapa",
          name_ne: "ई. विकास थापा",
          role_en: "Project Director",
          role_ne: "प्रोजेक्ट निर्देशक",
          exp: "18",
          spec_en: "Construction Execution & ISO Compliance Monitoring",
          spec_ne: "निर्माण कार्यान्वयन र आईएसओ अनुपालन अनुगमन",
          bio_en: "Bikash has overseen the construction of major hospitality and educational complexes in Kathmandu and Pokhara. He ensures compliance with national codes and ISO quality standards.",
          bio_ne: "विकासले काठमाडौं र पोखरामा ठूला आतिथ्य र शैक्षिक परिसरहरूको निर्माणको निरीक्षण गर्नुभएको छ। उहाँले राष्ट्रिय कोड र आईएसओ गुणस्तर मानकहरूको अनुपालन सुनिश्चित गर्नुहुन्छ।",
          qualifications_en: "B.E. in Civil Engineering, Katmandu University. Certified Quality Manager.",
          qualifications_ne: "बी.ई. सिभिल इन्जिनियरिङ्ग, काठमाडौं विश्वविद्यालय। प्रमाणित गुणस्तर प्रबन्धक।",
          rating: 4.7,
          image: "B",
        },
      ];

      const stmt = db.prepare(
        `INSERT INTO engineers (
          name_en, name_ne, role_en, role_ne, exp, spec_en, spec_ne, bio_en, bio_ne, qualifications_en, qualifications_ne, rating, image
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );

      defaultEngineers.forEach((eng) => {
        stmt.run(
          eng.name_en,
          eng.name_ne,
          eng.role_en,
          eng.role_ne,
          eng.exp,
          eng.spec_en,
          eng.spec_ne,
          eng.bio_en,
          eng.bio_ne,
          eng.qualifications_en,
          eng.qualifications_ne,
          eng.rating,
          eng.image
        );
      });
      stmt.finalize();
      console.log("Default engineers seeded successfully!");
    }
  });
function seedProducts() {
  db.get("SELECT COUNT(*) as count FROM products", [], (err, row) => {
    if (err) {
      console.error("Error checking product count:", err);
      return;
    }

    if (row && Number(row.count) === 0) {
      console.log("Seeding default products data...");
      const defaultProducts = [
        {
          name: "Shivam OPC Cement (Grade 43)",
          category: "Construction Material",
          price: 780,
          unit: "bag",
          vendor: "Shivam Cement Ltd.",
          rating: 4.8,
          image_icon: "🧱",
          description: "Premium grade Ordinary Portland Cement, ideal for high-strength RCC structural castings.",
        },
        {
          name: "Jagdamba Fe 500D TMT Steel Rebar",
          category: "Construction Material",
          price: 98,
          unit: "kg",
          vendor: "Jagdamba Steels",
          rating: 4.9,
          image_icon: "⛓️",
          description: "Thermo-mechanically treated high-ductility steel rebar, seismic-resistant certified.",
        },
        {
          name: "Red Clay Bricks (First Class)",
          category: "Construction Material",
          price: 16,
          unit: "piece",
          vendor: "Baneshwor Brick Industry",
          rating: 4.5,
          image_icon: "🧱",
          description: "Standard kiln-burned clay building bricks, uniform size and high compressive strength.",
        },
        {
          name: "Washed River Sand (Fine Grade)",
          category: "Construction Material",
          price: 4200,
          unit: "tipper (m3)",
          vendor: "Trishuli Sand Aggregates",
          rating: 4.6,
          image_icon: "⏳",
          description: "Double-washed river sand, low silt content, ideal for plastering and concrete mix.",
        },
        {
          name: "Premium Italian Statuario Marble",
          category: "Interior Design",
          price: 650,
          unit: "sq. ft.",
          vendor: "Kathmandu Stone & Marble House",
          rating: 4.9,
          image_icon: "💎",
          description: "Luxury white Italian marble with elegant gray veining, polished finish for floors.",
        },
        {
          name: "Modular Acrylic Kitchen Cabinet Set",
          category: "Interior Design",
          price: 185000,
          unit: "set",
          vendor: "Classic Kitchens & Decors",
          rating: 4.7,
          image_icon: "🍳",
          description: "Waterproof marine-plywood kitchen with soft-close acrylic drawers, built-in chimney space.",
        },
        {
          name: "Modern Nordic LED Chandelier",
          category: "Interior Design",
          price: 14500,
          unit: "piece",
          vendor: "Nepal Lights & Fixtures",
          rating: 4.8,
          image_icon: "💡",
          description: "Adjustable 3-color tone warm-to-cool LED ceiling light, minimalist gold ring profile.",
        },
        {
          name: "Handwoven Royal Woolen Carpet",
          category: "Interior Design",
          price: 38000,
          unit: "piece (6x9 ft)",
          vendor: "Himalayan Carpet Weavers",
          rating: 4.7,
          image_icon: "🧶",
          description: "100-knot pure Nepalese sheep wool rug with traditional organic dye designs.",
        },
      ];

      const stmt = db.prepare(
        `INSERT INTO products (
          name, category, price, unit, vendor, rating, image_icon, description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      );

      defaultProducts.forEach((p) => {
        stmt.run(
          p.name,
          p.category,
          p.price,
          p.unit,
          p.vendor,
          p.rating,
          p.image_icon,
          p.description
        );
      });
      stmt.finalize();
      console.log("Default products seeded successfully!");
    }
  });
}

export default db;
