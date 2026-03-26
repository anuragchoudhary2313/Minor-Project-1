#!/usr/bin/env node
// Backend startup wrapper with diagnostic logging
console.log('📋 Backend Startup Diagnostics');
console.log('=' .repeat(50));

// Environment check
console.log('\n1️⃣  Environment Variables:');
console.log(`   PORT: ${process.env.PORT || 'not set (default 5000)'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set (default development)'}`);
console.log(`   MONGO_URI: ${process.env.MONGO_URI ? '✓ set' : '❌ not set'}`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '✓ set' : '❌ using fallback'}`);

// Dependencies check
console.log('\n2️⃣  Checking dependencies:');
try {
  require('express');
  console.log('   ✓ express');
  require('mongoose');
  console.log('   ✓ mongoose');
  require('cors');
  console.log('   ✓ cors');
  require('bcryptjs');
  console.log('   ✓ bcryptjs');
} catch (err) {
  console.log(`   ❌ Missing: ${err.message}`);
  console.log('\n   Run: npm install');
  process.exit(1);
}

console.log('\n3️⃣  Starting server...\n');

// Load and run the actual backend
require('./index.js');
