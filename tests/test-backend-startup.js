#!/usr/bin/env node
/**
 * Quick startup test - verifies backend can start and serve requests
 */
const http = require('http');
const path = require('path');
const { spawn } = require('child_process');

console.log('🔍 GoFood Backend Diagnostic Test\n');
console.log('This will:');
console.log('  1. Start backend server');
console.log('  2. Wait for startup');
console.log('  3. Test connectivity\n');

const backendPath = path.join(__dirname, 'Gofood', 'backend');

const backend = spawn('node', ['index.js'], {
  cwd: backendPath,
  stdio: 'pipe'
});

let output = '';
let testComplete = false;

// Capture backend output
backend.stdout.on('data', (data) => {
  output += data.toString();
  process.stdout.write(data);
});

backend.stderr.on('data', (data) => {
  output += data.toString();
  process.stderr.write(data);
});

// After 5 seconds, test if backend is responding
setTimeout(() => {
  if (testComplete) return;
  testComplete = true;

  console.log('\n\n📡 Testing connectivity...\n');

  const req = http.get('http://localhost:5000/', (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('✅ Backend is responding!');
        console.log(`   Status: ${data.status}`);
        console.log(`   Version: ${data.version}`);
        console.log(`   Message: ${data.message}\n`);
        console.log('✅ SUCCESS - Backend is ready!\n');
        console.log('Keep this terminal open and:');
        console.log('  1. Open new terminal in Gofood/ directory');
        console.log('  2. Run: npm start\n');
      } catch (e) {
        console.log('⚠️ Backend responded but with invalid JSON\n');
      }
      backend.kill();
    });
  });

  req.on('error', (err) => {
    console.log(`❌ Backend not responding: ${err.message}\n`);
    console.log('Possible issues:');
    console.log('  - Port 5000 might be in use');
    console.log('  - Backend crashed during startup');
    console.log('  - Check MONGO_URI in .env\n');
    backend.kill();
  });

  req.setTimeout(2000, () => {
    req.destroy();
    console.log('❌ Backend not responding (timeout)\n');
    backend.kill();
  });
}, 5000);

// Handle backend exit
backend.on('exit', (code) => {
  if (!testComplete) {
    console.log(`\n⚠️ Backend exited with code ${code}`);
    console.log('Check error messages above');
  }
  process.exit(code);
});

// Allow Ctrl+C to stop
process.on('SIGINT', () => {
  console.log('\n\nStopping backend...');
  backend.kill();
  process.exit(0);
});
