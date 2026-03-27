const http = require('http');

const ports = [5000, 5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010];
let tested = 0;

ports.forEach(p => {
  const req = http.get({ host: 'localhost', port: p, path: '/', timeout: 800 }, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`✓ Port ${p}: ${res.statusCode} - ${data.substring(0, 60)}`);
      if (++tested === ports.length) process.exit(0);
    });
  });
  
  req.on('error', err => {
    console.log(`✗ Port ${p}: ${err.code}`);
    if (++tested === ports.length) process.exit(0);
  });
  
  req.setTimeout(1000, () => req.destroy());
});

setTimeout(() => {
  console.log(`Tested ${tested}/${ports.length}`);
  process.exit(0);
}, 12000);
