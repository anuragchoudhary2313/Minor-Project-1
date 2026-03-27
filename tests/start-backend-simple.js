#!/usr/bin/env node
// Simple startup script that logs everything
const cp = require('child_process');
const path = require('path');

const backendDir = path.join(__dirname, 'Gofood', 'backend');
console.log(`📂 Backend directory: ${backendDir}\n`);

const proc = cp.spawn('node', ['index.js'], {
  cwd: backendDir,
  stdio: 'inherit',  // Show all output
  detached: false
});

proc.on('error', err => {
  console.error('Failed to start backend:', err);
  process.exit(1);
});

proc.on('exit', code => {
  console.log(`\n⚠️ Backend exited with code ${code}`);
});

// Keep parent alive
process.on('SIGINT', () => {
  proc.kill();
  process.exit(0);
});
