import { supabase } from './lib/supabase';

// Test form submission to Supabase
async function testFormSubmission() {
  try {
    console.log('Testing form submission to Supabase...');
    
    // This is a test submission - in a real app, this would come from the form
    const testSubmission = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message',
      notify: true,
      created_at: new Date().toISOString()
    };
    
    // Note: This will fail if you haven't set up your Supabase credentials properly
    // and created the contact_submissions table
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([testSubmission])
      .select();
    
    if (error) {
      console.log('Expected error (since Supabase credentials are not set up):', error.message);
      console.log('This is expected if you haven\'t configured your Supabase project yet.');
      console.log('Please follow the instructions in README.md to set up Supabase.');
    } else {
      console.log('Form submission successful:', data);
    }
  } catch (error) {
    console.error('Error testing form submission:', error);
  }
}

testFormSubmission();