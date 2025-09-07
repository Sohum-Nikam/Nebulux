// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Create a Supabase client using the actual environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugInsert() {
  try {
    console.log('=== Supabase Debug Script ===');
    console.log('Supabase URL:', supabaseUrl);
    console.log('Anon Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'Not set');
    
    // Test connection by getting user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('Auth user:', user ? 'Authenticated' : 'Not authenticated');
    if (authError) console.log('Auth error:', authError.message);
    
    // Try to insert data
    console.log('\n--- Testing Insert ---');
    const testData = {
      name: 'Debug Test User',
      email: 'debug@example.com',
      message: 'Debug test message',
      notify: true,
      created_at: new Date().toISOString()
    };
    
    console.log('Inserting test data:', testData);
    
    const { data, error } = await supabase
      .from('Client Table')
      .insert([testData])
      .select();
    
    if (error) {
      console.log('❌ Insert error:', error);
      console.log('Error code:', error.code);
      console.log('Error details:', error.details);
      console.log('Error hint:', error.hint);
    } else {
      console.log('✅ Insert successful:', data);
    }
    
    // Try to fetch data
    console.log('\n--- Testing Select ---');
    const { data: fetchedData, error: fetchError } = await supabase
      .from('Client Table')
      .select('*')
      .limit(5);
    
    if (fetchError) {
      console.log('❌ Fetch error:', fetchError);
    } else {
      console.log('✅ Fetch successful. Found', fetchedData.length, 'records');
      if (fetchedData.length > 0) {
        console.log('Sample record:', fetchedData[0]);
      }
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

debugInsert();