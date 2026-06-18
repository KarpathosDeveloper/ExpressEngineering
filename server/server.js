import express from "express";
import cors from "cors";
import db from "./database.js";

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// Logger for simulated notifications
const sendWhatsAppNotification = (number, message) => {
  console.log("=========================================");
  console.log(`[WHATSAPP NOTIFICATION SENDING...]`);
  console.log(`To: ${number}`);
  console.log(`Message: \n${message}`);
  console.log("=========================================");
};

// -------------------------------------------------------------
// ENGINEERS API (CRUD)
// -------------------------------------------------------------

// Get all engineers
app.get("/api/engineers", (req, res) => {
  db.all("SELECT * FROM engineers ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add a new engineer
app.post("/api/engineers", (req, res) => {
  const {
    name_en,
    name_ne,
    role_en,
    role_ne,
    exp,
    spec_en,
    spec_ne,
    bio_en,
    bio_ne,
    qualifications_en,
    qualifications_ne,
    rating,
    image,
  } = req.body;

  if (!name_en || !name_ne || !role_en || !role_ne) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    INSERT INTO engineers (
      name_en, name_ne, role_en, role_ne, exp, spec_en, spec_ne, bio_en, bio_ne, qualifications_en, qualifications_ne, rating, image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      name_en,
      name_ne,
      role_en,
      role_ne,
      exp || "5",
      spec_en || "",
      spec_ne || "",
      bio_en || "",
      bio_ne || "",
      qualifications_en || "",
      qualifications_ne || "",
      rating || 4.8,
      image || "E",
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, message: "Engineer added successfully" });
    }
  );
});

// Update engineer details
app.put("/api/engineers/:id", (req, res) => {
  const { id } = req.params;
  const {
    name_en,
    name_ne,
    role_en,
    role_ne,
    exp,
    spec_en,
    spec_ne,
    bio_en,
    bio_ne,
    qualifications_en,
    qualifications_ne,
    rating,
    image,
  } = req.body;

  const query = `
    UPDATE engineers SET 
      name_en = ?, name_ne = ?, role_en = ?, role_ne = ?, 
      exp = ?, spec_en = ?, spec_ne = ?, bio_en = ?, bio_ne = ?, 
      qualifications_en = ?, qualifications_ne = ?, rating = ?, image = ?
    WHERE id = ?
  `;

  db.run(
    query,
    [
      name_en,
      name_ne,
      role_en,
      role_ne,
      exp,
      spec_en,
      spec_ne,
      bio_en,
      bio_ne,
      qualifications_en,
      qualifications_ne,
      rating,
      image,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Engineer not found" });
      }
      res.json({ message: "Engineer updated successfully" });
    }
  );
});

// Delete engineer details
app.delete("/api/engineers/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM engineers WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Engineer not found" });
    }
    res.json({ message: "Engineer deleted successfully" });
  });
});


// -------------------------------------------------------------
// INQUIRIES API (PROJECT INQUIRY & TRACKING)
// -------------------------------------------------------------

// Submit project inquiry (saved to DB + WhatsApp notification to +9779810555494)
app.post("/api/inquiries", (req, res) => {
  const {
    owner_name,
    contact,
    email,
    address,
    project_type,
    description,
    citizenship_no,
    site_area,
    lalpurja_file,
    citizenship_file,
    site_photo,
  } = req.body;

  if (!owner_name || !contact || !address || !project_type) {
    return res.status(400).json({ error: "Missing required inquiry fields" });
  }

  // Generate Inquiry Number: INQ-XXXXXX (6 digits)
  const inquiryNumber = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;

  const query = `
    INSERT INTO inquiries (
      inquiry_number, owner_name, contact, email, address, project_type, description,
      citizenship_no, site_area, lalpurja_file, citizenship_file, site_photo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      inquiryNumber,
      owner_name,
      contact,
      email || "",
      address,
      project_type,
      description || "",
      citizenship_no || "",
      site_area || "",
      lalpurja_file || "",
      citizenship_file || "",
      site_photo || "",
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // WhatsApp Message construction
      const message = `🚨 *NEW PROJECT INQUIRY* 🚨\n\n` +
        `• *Inquiry No:* ${inquiryNumber}\n` +
        `• *Client Name:* ${owner_name}\n` +
        `• *Contact:* ${contact}\n` +
        `• *Email:* ${email || "N/A"}\n` +
        `• *Address:* ${address}\n` +
        `• *Project Type:* ${project_type}\n` +
        `• *Land Site Area:* ${site_area || "N/A"}\n` +
        `• *Citizenship No:* ${citizenship_no || "N/A"}\n` +
        `• *Details:* ${description || "None"}\n` +
        `• *Attachments:* ` +
        `[${lalpurja_file ? "✓ Lalpurja (Land deed)" : "✗ Lalpurja"}, ` +
        `${citizenship_file ? "✓ Citizenship ID" : "✗ Citizenship"}, ` +
        `${site_photo ? "✓ Site Photo" : "✗ Site Photo"}]\n\n` +
        `_Express Engineering Consultancy - Enterprise Dashboard System_`;

      // Trigger server-side WhatsApp message simulation
      sendWhatsAppNotification("+9779810555494", message);

      res.json({
        id: this.lastID,
        inquiry_number: inquiryNumber,
        status: "Inquiry Received",
        message: "Project inquiry submitted successfully",
      });
    }
  );
});

// Track project inquiry stage
app.get("/api/inquiries/track/:number", (req, res) => {
  const { number } = req.params;

  db.get(
    "SELECT * FROM inquiries WHERE inquiry_number = ?",
    [number],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: "Inquiry number not found" });
      }
      res.json(row);
    }
  );
});

// Get all inquiries (admin)
app.get("/api/inquiries", (req, res) => {
  db.all("SELECT * FROM inquiries ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Update inquiry stage (admin)
app.put("/api/inquiries/:id", (req, res) => {
  const { id } = req.params;
  const { current_stage, status } = req.body;

  const isNumeric = /^\d+$/.test(id);
  const query = isNumeric
    ? `UPDATE inquiries SET current_stage = ?, status = ? WHERE id = ?`
    : `UPDATE inquiries SET current_stage = ?, status = ? WHERE inquiry_number = ?`;

  const paramValue = isNumeric ? parseInt(id, 10) : id;

  db.run(query, [current_stage, status || "active", paramValue], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const changes = this ? this.changes : 0;
    if (changes === 0) {
      // Fallback: try update by inquiry_number directly
      const fallbackQuery = `UPDATE inquiries SET current_stage = ?, status = ? WHERE inquiry_number = ?`;
      db.run(fallbackQuery, [current_stage, status || "active", id], function (err2) {
        if (err2) {
          return res.status(500).json({ error: err2.message });
        }
        const fallbackChanges = this ? this.changes : 0;
        if (fallbackChanges === 0) {
          return res.status(404).json({ error: "Inquiry not found" });
        }
        return res.json({ message: "Inquiry updated successfully" });
      });
      return;
    }
    res.json({ message: "Inquiry updated successfully" });
  });
});


// -------------------------------------------------------------
// ORDERS API (EXPRESS SHOP ORDERS)
// -------------------------------------------------------------

// Submit shop order
app.post("/api/orders", (req, res) => {
  const { owner_name, contact, address, items, total_price } = req.body;

  if (!owner_name || !contact || !address || !items || !total_price) {
    return res.status(400).json({ error: "Missing required order fields" });
  }

  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const itemsJson = JSON.stringify(items);

  const query = `
    INSERT INTO orders (order_number, owner_name, contact, address, items, total_price)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [orderNumber, owner_name, contact, address, itemsJson, total_price],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Format items for message
      const formattedItems = items
        .map((item) => `  - ${item.name} (${item.category}) x${item.quantity} - Rs. ${item.price * item.quantity}`)
        .join("\n");

      // WhatsApp Message construction
      const message = `🛒 *NEW SHOP ORDER* 🛒\n\n` +
        `• *Order No:* ${orderNumber}\n` +
        `• *Client Name:* ${owner_name}\n` +
        `• *Contact:* ${contact}\n` +
        `• *Address:* ${address}\n\n` +
        `*Items Ordered:*\n${formattedItems}\n\n` +
        `• *Total Price:* Rs. ${total_price}\n\n` +
        `_Express Shop Multi-Vendor Platform_`;

      sendWhatsAppNotification("+9779810555494", message);

      res.json({
        id: this.lastID,
        order_number: orderNumber,
        message: "Shop order logged successfully",
      });
    }
  );
});

// Get all orders (admin)
app.get("/api/orders", (req, res) => {
  db.all("SELECT * FROM orders ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Parse items back to JSON objects
    const parsedRows = rows.map((row) => ({
      ...row,
      items: JSON.parse(row.items),
    }));
    res.json(parsedRows);
  });
});

// -------------------------------------------------------------
// PRODUCTS API (CRUD)
// -------------------------------------------------------------

// Get all products
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add a new product
app.post("/api/products", (req, res) => {
  const { name, category, price, unit, vendor, rating, image_icon, description } = req.body;

  if (!name || !category || !price || !unit || !vendor) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    INSERT INTO products (name, category, price, unit, vendor, rating, image_icon, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [name, category, Number(price), unit, vendor, rating || 4.8, image_icon || "📦", description || ""],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, message: "Product added successfully" });
    }
  );
});

// Update a product
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, price, unit, vendor, rating, image_icon, description } = req.body;

  const query = `
    UPDATE products SET 
      name = ?, category = ?, price = ?, unit = ?, vendor = ?, rating = ?, image_icon = ?, description = ?
    WHERE id = ?
  `;

  db.run(
    query,
    [name, category, Number(price), unit, vendor, rating || 4.8, image_icon || "📦", description || "", id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ message: "Product updated successfully" });
    }
  );
});

// Delete a product
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
