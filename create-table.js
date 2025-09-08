// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Create a Supabase client using the actual environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createContactTable() {
  try {
    console.log('Creating contact_submissions table...');
    
    // Since we can't create tables directly with the client, let's show the SQL needed
    console.log('To create the contact_submissions table, run this SQL in your Supabase SQL editor:');
    console.log(`
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  notify BOOLEAN DEFAULT true,
  company TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
    `);
    
    console.log('After creating the table, you can insert test data with:');
    console.log(`
INSERT INTO contact_submissions (name, email, message, notify, company) 
VALUES ('John Doe', 'john@example.com', 'Hello, this is a test message', true, 'Acme Inc');
    `);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createContactTable();