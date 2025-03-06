module.exports = {
  apps: [
    {
      name: 'shopify-backend',   // The name of your app
      script: './server.js',     // Path to your main server file
      exec_mode: 'fork',         // Ensures the app runs as a single instance
      instances: 1,
      env: {
        SUPABASE_URL: 'https://biriflndhkpkuedhquvo.supabase.co',  
        SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpcmlmbG5kaGtwa3VlZGhxdXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNTg4NTIsImV4cCI6MjA1NjgzNDg1Mn0.IEKrwxCP8ha3jqG9Ct_CRPJfv4lP4isxqOJsAa53OXo', 
        PORT: 8080,   
        SHOPIFY_API_KEY: 'fb4416f164909f1c14d747ebfc64c665',  
        SHOPIFY_API_SECRET: 'bff59ee85845c80159306ba3572700cc',  
      }
    }
  ]
};
