@echo off
REM Slumberland UI Setup Script (Windows)

echo.
echo 🌊💤 SLUMBERLAND - Setup Starting...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version
echo ✅ npm found
npm --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Installation complete!
    echo.
    echo 🚀 Starting Slumberland...
    echo    Opening at http://localhost:3000
    echo.
    call npm start
) else (
    echo.
    echo ❌ Installation failed. Please check the errors above.
    pause
    exit /b 1
)
