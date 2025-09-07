// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Create a Supabase client using the actual environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testTableInsert() {
  try {
    console.log('Testing insert into "Client Table"...');
    
    // Try to insert a test record
    const { data, error } = await supabase
      .from('Client Table')
      .insert([
        {
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a test message',
          notify: true,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.log('❌ Error inserting data:', error.message);
      return;
    }
    
    console.log('✅ Data inserted successfully:', data);
    
    // Try to fetch the data back
    const { data: fetchedData, error: fetchError } = await supabase
      .from('Client Table')
      .select('*')
      .limit(5);
    
    if (fetchError) {
      console.log('❌ Error fetching data:', fetchError.message);
      return;
    }
    
    console.log('✅ Fetched data:', fetchedData);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testTableInsert();