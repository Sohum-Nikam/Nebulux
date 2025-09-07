#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Nebulux project...');

try {
  // Check if we're in the project directory
  if (!fs.existsSync(path.join(process.cwd(), 'package.json'))) {
    console.error('❌ Please run this script from the project root directory');
    process.exit(1);
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Check if .env.local exists, if not create it from .env.example
  if (!fs.existsSync('.env.local')) {
    console.log('📝 Creating .env.local from .env.example...');
    fs.copyFileSync('.env.example', '.env.local');
  }

  console.log('\n✅ Setup complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Update .env.local with your Supabase credentials');
  console.log('2. Create the contact_submissions table in your Supabase project');
  console.log('3. Run `npm run dev` to start the development server');
  console.log('4. Visit http://localhost:3000 in your browser');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}