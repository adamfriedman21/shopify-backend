import 'dotenv/config'; // Load environment variables
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json()); // Parse JSON bodies

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`➡️  Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Debug: Print environment variables
console.log("🚀 SUPABASE_URL from .env:", process.env.SUPABASE_URL || "❌ MISSING");
console.log("🚀 SUPABASE_KEY from .env:", process.env.SUPABASE_KEY ? "✅ Loaded" : "❌ MISSING");

// Ensure essential environment variables are set
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_KEY. Check your .env file.");
  process.exit(1);
}

// Root route to handle GET /
app.get("/", (req, res) => {
  res.send("🚀 Shopify Backend is Running!");
});

// Shopify Webhook Handler
app.post('/shopify-webhook', async (req, res) => {
  console.log("📩 Incoming Shopify Webhook:", req.body);

  if (!req.body || !req.body.id) {
    return res.status(400).send("❌ Invalid Shopify Webhook Payload");
  }

  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/shopify_orders`, {
      method: 'POST',
      headers: {
        "apikey": process.env.SUPABASE_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: req.body.id,
        raw_payload: req.body
      })
    });
    

    if (!response.ok) {
      // Attempt to read error details from the response body
      const errorText = await response.text();
      console.error("❌ Supabase Error:", response.status, response.statusText, errorText);
      throw new Error(`❌ Supabase Error: ${response.statusText}`);
    }

    console.log("✅ Shopify Order Stored Successfully");
    res.status(200).send("✅ Shopify Order Stored.");
  } catch (error) {
    // Log the full error object for extra context
    console.error("❌ Error Processing Shopify Webhook:", error);
    res.status(500).send("❌ Internal Server Error");
  }
});


// Log registered routes for debugging
console.log("📌 Registered Routes:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`➡️ ${r.route.path}`);
  }
});

// Start the server on port from environment variable (or default 8080)
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Backend running on port ${PORT}`));
