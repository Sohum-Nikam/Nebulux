// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Create a Supabase client using the actual environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createContactTable() {
  try {
    console.log('Creating contact_submissions table...');
    
    // Check if table already exists
    const { data: existingTable, error: tableError } = await supabase
      .from('contact_submissions')
      .select('id')
      .limit(1);
    
    if (tableError && !tableError.message.includes('contact_submissions')) {
      console.log('❌ Error checking table:', tableError.message);
      return;
    }
    
    if (existingTable) {
      console.log('✅ Table already exists');
      return;
    }
    
    // In a real Supabase environment, you would create the table through the Supabase dashboard
    // or use the Supabase CLI. For now, we'll just confirm the connection works.
    console.log('✅ Connection to Supabase established');
    console.log('To create the contact_submissions table, please run the following SQL in your Supabase SQL editor:');
    console.log(`
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  notify BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
    `);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createContactTable();