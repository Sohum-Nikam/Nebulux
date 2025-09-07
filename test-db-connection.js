// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Create a Supabase client using the actual environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

console.log('Testing Supabase connection with credentials:');
console.log('Supabase URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'Not set');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test the connection by trying to fetch data from a table (this will fail if table doesn't exist, but connection should work)
async function testConnection() {
  try {
    console.log('\nTesting connection...');
    
    // This will test if we can connect to Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('id')
      .limit(1);
    
    if (error && error.message.includes('contact_submissions')) {
      console.log('✅ Connection successful! (Table does not exist yet, but connection works)');
    } else if (error) {
      console.log('❌ Error:', error.message);
    } else {
      console.log('✅ Connection successful!');
      console.log('Data:', data);
    }
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

testConnection();