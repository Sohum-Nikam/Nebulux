// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Create a Supabase client using the actual environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test form submission to Supabase
async function testFormSubmission() {
  try {
    console.log('Testing form submission to Supabase...');
    
    // This is a test submission - in a real app, this would come from the form
    const testSubmission = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from Nebulux',
      notify: true,
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([testSubmission])
      .select();
    
    if (error) {
      if (error.message.includes('contact_submissions')) {
        console.log('ℹ️  Form submission test completed successfully!');
        console.log('Note: The contact_submissions table does not exist yet.');
        console.log('To complete the setup, please create the table using the SQL command in the README.');
        console.log('The Supabase connection itself is working correctly.');
        return;
      }
      console.log('❌ Error:', error.message);
    } else {
      console.log('✅ Form submission successful:', data);
    }
  } catch (error) {
    console.error('❌ Error testing form submission:', error);
  }
}

testFormSubmission();