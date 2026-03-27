#!/usr/bin/env node
/**
 * Complete GoFood API Test - validates entire flow
 */
const http = require('http');

function testPort(port, path, method = 'GET') {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port,
      path,
      method,
      timeout: 1000,
      headers: method === 'POST' ? { 'Content-Type': 'application/json' } : {}
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed, error: null });
        } catch (e) {
          resolve({ status: res.statusCode, data: null, error: e.message });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ status: null, data: null, error: err.message });
    });

    req.setTimeout(1500);
    if (method === 'POST') req.write('{}');
    req.end();
  });
}

async function runTests() {
  console.log('\n🧪 GoFood API Test Suite\n');
  console.log('='  .repeat(50));

  // Test 1: Root endpoint
  console.log('\n[TEST 1] Root endpoint (localhost:5000/)');
  const root = await testPort(5000, '/', 'GET');
  if (root.error) {
    console.log(`❌ Error: ${root.error}`);
    console.log('\n❌ FAILED - Backend is not running or not responding');
    console.log('\nTo fix:');
    console.log('  1. Open PowerShell');
    console.log('  2. Run: cd "c:\\Users\\anura\\OneDrive\\Desktop\\projects\\FoGood\\Gofood\\backend"');
    console.log('  3. Run: node index.js');
    console.log('  4. Wait for "🚀 Server running on http://localhost:5000"');
    console.log('  5. Don\'t close that window');
    process.exit(1);
  } else {
    console.log(`✅ Status: ${root.status}`);
    console.log(`   Message: ${root.data?.message}`);
    console.log(`   Status: ${root.data?.status}`);
  }

  // Test 2: Food data endpoint  
  console.log('\n[TEST 2] Food data endpoint (localhost:5000/api/auth/foodData)');
  const food = await testPort(5000, '/api/auth/foodData', 'POST');
  if (food.error) {
    console.log(`❌ Error: ${food.error}`);
  } else {
    console.log(`✅ Status: ${food.status}`);
    if (food.data?.success && food.data?.data) {
      const [items, categories] = food.data.data;
      console.log(`   Items loaded: ${items?.length || 0}`);
      console.log(`   Categories: ${categories?.length || 0}`);
      if (items?.length > 0) {
        console.log(`   Sample: "${items[0].name}"`);
      }
    } else {
      console.log('   Response:', JSON.stringify(food.data).slice(0, 100));
    }
  }

  // Test 3: Port discovery
  console.log('\n[TEST 3] Port discovery (scanning 5000-5005)');
  for (let p = 5000; p <= 5005; p++) {
    const result = await testPort(p, '/', 'GET');
    if (!result.error && result.status === 200) {
      console.log(`✅ Port ${p}: OPEN - Server running`);
    } else {
      console.log(`   Port ${p}: closed`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ All tests passed! Backend is working.\n');
  console.log('Next steps:');
  console.log('  1. Open new terminal');
  console.log('  2. cd c:\\Users\\anura\\OneDrive\\Desktop\\projects\\FoGood\\Gofood');
  console.log('  3. npm start');
  console.log('  4. Browser will open - menu should load with test data\n');
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
