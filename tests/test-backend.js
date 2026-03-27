// Minimal test server to verify basic connectivity
const http = require('http');
const PORT = process.env.PORT || 5010;

const server = http.createServer((req, res) => {
  // Enable CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'GoFood API Server (TEST)',
      status: 'running',
      port: PORT
    }));
  } else if (req.url === '/api/auth/foodData') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      data: [
        [{ id: 1, name: 'Test Dish' }],
        [{ id: 1, name: 'Test Category' }]
      ]
    }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 TEST SERVER running on port ${PORT}`);
  console.log(`   - Root: http://localhost:${PORT}/`);
  console.log(`   - FoodData: http://localhost:${PORT}/api/auth/foodData`);
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is in use. Try: PORT=5011 node test-backend.js`);
    process.exit(1);
  }
  throw err;
});
