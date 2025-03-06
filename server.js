import 'dotenv/config'; // ✅ Correct way to load environment variables
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

// ✅ Debugging: Print environment variables in Railway logs
console.log("🚀 SUPABASE_URL from Railway:", process.env.SUPABASE_URL);
console.log("🚀 SUPABASE_KEY from Railway:", process.env.SUPABASE_KEY);
console.log("🚀 Full Environment Variables:", process.env);

// 🛒 Shopify Webhook
app.post('/shopify-webhook', async (req, res) => {
    const order = req.body;

    await fetch(`${process.env.SUPABASE_URL}/rest/v1/shopify_orders`, {
        method: 'POST',
        headers: {
            "apikey": process.env.SUPABASE_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: order.id,
            vendor_id: "123e4567-e89b-12d3-a456-426614174000",
            raw_payload: order
        })
    });

    res.status(200).send("Shopify Order Stored.");
});

// 🌍 Start the Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
