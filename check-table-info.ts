// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Create a Supabase client using the actual environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTableInfo() {
  try {
    console.log('Checking table information for "Client Table"...');
    
    // Check if we can access the table structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('Client Table')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.log('❌ Error accessing table:', tableError.message);
      
      // Let's try to get table info from the schema
      const { data: schemaInfo, error: schemaError } = await supabase
        .from('information_schema.tables')
        .select('*')
        .eq('table_name', 'Client Table');
      
      if (schemaError) {
        console.log('❌ Error getting schema info:', schemaError.message);
      } else {
        console.log('Schema info:', schemaInfo);
      }
    } else {
      console.log('✅ Table accessible. Sample data:', tableInfo);
    }
    
    // Check RLS status
    const { data: rlsInfo, error: rlsError } = await supabase
      .rpc('get_rls_status', { table_name: 'Client Table' });
    
    if (rlsError) {
      console.log('RLS check error:', rlsError.message);
    } else {
      console.log('RLS status:', rlsInfo);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkTableInfo();