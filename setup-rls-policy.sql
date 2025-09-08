-- SQL script to set up RLS policy for the Client Table
-- Run this in your Supabase SQL editor

-- First, let's check if RLS is enabled on the table
SELECT tablename, relname, relrowsecurity 
FROM pg_class pc 
JOIN pg_tables pt ON pc.relname = pt.tablename 
WHERE pt.tablename = 'Client Table';

-- Enable RLS on the table (if not already enabled)
ALTER TABLE "Client Table" ENABLE ROW LEVEL SECURITY;

-- Remove any existing policies on the table to avoid conflicts
DROP POLICY IF EXISTS "Allow public insert" ON "Client Table";
DROP POLICY IF EXISTS "Allow public read" ON "Client Table";

-- Create a policy that allows anyone to insert data
CREATE POLICY "Allow public insert" ON "Client Table"
FOR INSERT WITH CHECK (true);

-- Create a policy that allows anyone to read data (optional, for admin access)
CREATE POLICY "Allow public read" ON "Client Table"
FOR SELECT USING (true);

-- Grant necessary permissions to anonymous users
GRANT INSERT, SELECT ON TABLE "Client Table" TO anon;

-- Verify the policies were created
SELECT pol.polname as policyname, pc.relname as tablename 
FROM pg_policy pol
JOIN pg_class pc ON pc.oid = pol.polrelid
WHERE pc.relname = 'Client Table';