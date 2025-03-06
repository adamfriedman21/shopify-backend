import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

async function testConnection() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
        method: "GET",
        headers: {
            "apikey": SUPABASE_KEY,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log("Supabase Orders:", JSON.stringify(data, null, 2));
}

testConnection();

