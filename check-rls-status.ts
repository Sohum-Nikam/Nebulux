// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Create a Supabase client using the actual environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkRLSStatus() {
  try {
    console.log('=== Checking RLS Status ===');
    
    // Try a simple operation to see if we can interact with the table
    const { data, error } = await supabase
      .from('Client Table')
      .select('count()', { head: true, count: 'exact' });
    
    if (error) {
      console.log('❌ Error checking table:', error.message);
      
      // Try to get table info from PostgreSQL system tables
      const { data: tableInfo, error: tableError } = await supabase
        .rpc('execute_sql', { 
          sql: `
            SELECT 
              tablename, 
              relrowsecurity as rls_enabled,
              relforcerowsecurity as force_rls
            FROM pg_class pc 
            JOIN pg_tables pt ON pc.relname = pt.tablename 
            WHERE pt.tablename = 'Client Table'
          `
        });
      
      if (tableError) {
        console.log('❌ Error getting table info:', tableError.message);
      } else {
        console.log('Table info:', tableInfo);
      }
    } else {
      console.log('✅ Table accessible. Count:', data);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkRLSStatus();