@echo off
cd /d "%~dp0Gofood\backend"
echo Starting GoFood Backend Server...
echo.
node index.js
echo.
echo Backend exited. Check MongoDB connection if error occurred.
pause
