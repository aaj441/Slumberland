#!/bin/bash

# Slumberland UI Setup Script (Mac/Linux)

echo "🌊💤 SLUMBERLAND - Setup Starting..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🚀 Starting Slumberland..."
    echo "   Opening at http://localhost:3000"
    echo ""
    npm start
else
    echo ""
    echo "❌ Installation failed. Please check the errors above."
    exit 1
fi
