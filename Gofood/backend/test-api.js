const fetch = require('node-fetch');

async function testApi() {
  try {
    const res = await fetch('http://localhost:5000/api/auth/foodData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('API Test Failed:', err.message);
  }
}

testApi();
