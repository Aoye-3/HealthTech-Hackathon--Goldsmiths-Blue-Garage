@echo off
setlocal

cd /d "%~dp0"

echo.
echo ProcureSmart local frontend launcher
echo -----------------------------------

if not exist "node_modules\" (
  echo.
  echo Dependencies are not installed.
  echo Run this command first:
  echo   npm install
  echo.
  pause
  exit /b 1
)

echo Starting Vite on http://127.0.0.1:3000/need-definition
echo Press Ctrl+C to stop the server.
echo.

npm.cmd run dev:local

endlocal
