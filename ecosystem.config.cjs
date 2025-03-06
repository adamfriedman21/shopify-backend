module.exports = {
  apps: [
    {
      name: 'shopify-backend',   // The name of your app
      script: './server.js',     // Path to your main server file
      exec_mode: 'fork',         // Ensures the app runs as a single instance
      instances: 1,
      env: {
        SUPABASE_URL: 'https://biriflndhkpkuedhquvo.supabase.co',  // Your Supabase URL
        SUPABASE_KEY: 'your-supabase-key-here', // Your Supabase key
        PORT: 8080,   // Your port number
        SHOPIFY_API_KEY: 'your-shopify-api-key-here',  // Your Shopify API Key
        SHOPIFY_API_SECRET: 'your-shopify-api-secret-here',  // Your Shopify API Secret
      }
    }
  ]
};

