require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// 🛒 Shopify Webhook (E-Commerce Orders)
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
            vendor_id: "123e4567-e89b-12d3-a456-426614174000", // Replace with real vendor logic
            raw_payload: order
        })
    });

    res.status(200).send("Shopify Order Stored.");
});

// 🏬 Vendor Order Submission (Retail Sales)
app.post('/vendor-order', async (req, res) => {
    const order = req.body;

    await fetch(`${process.env.SUPABASE_URL}/rest/v1/orders`, {
        method: 'POST',
        headers: {
            "apikey": process.env.SUPABASE_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            vendor_id: order.vendor_id,
            customer_id: order.customer_id || null,
            total_price: order.total_price,
            financial_status: order.financial_status
        })
    });

    res.status(200).send("Retail Order Stored.");
});

// 💳 Stripe Webhook (Payment Updates)
app.post('/stripe-webhook', async (req, res) => {
    const event = req.body;

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;

        await fetch(`${process.env.SUPABASE_URL}/rest/v1/orders?id=eq.${paymentIntent.metadata.order_id}`, {
            method: 'PATCH',
            headers: {
                "apikey": process.env.SUPABASE_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ financial_status: "Paid" })
        });
    }

    res.status(200).send("Payment updated.");
});

// 🌍 Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
