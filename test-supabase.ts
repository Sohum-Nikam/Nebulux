import { supabase } from './lib/supabase';

// Test the Supabase client
async function testSupabase() {
  try {
    // This will test if we can connect to Supabase
    // Note: This will fail if you haven't set up your Supabase credentials
    console.log('Supabase client created successfully');
    console.log('Supabase URL:', supabase);
  } catch (error) {
    console.error('Error testing Supabase:', error);
  }
}

testSupabase();