#!/bin/bash

# Slumberland Automated Deployment Script
# This fully automates the deployment process

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════╗"
echo "║     SLUMBERLAND - Automated Deployment         ║"
echo "║         12 Agentic Gods Dream Journal           ║"
echo "╚══════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if we're in Slumberland directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Not in Slumberland directory${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
pnpm install

echo ""
echo -e "${YELLOW}Step 2: Setting up database...${NC}"
pnpm db:push

echo ""
echo -e "${YELLOW}Step 3: Building application...${NC}"
pnpm build

echo ""
echo -e "${GREEN}✅ Slumberland is ready to deploy!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo ""
echo "1. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/Slumberland.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to production:"
echo "   - Vercel: https://vercel.com/new"
echo "   - Railway: https://railway.app/new"
echo "   - Render: https://render.com"
echo ""
echo -e "${GREEN}Deployment files ready:${NC}"
echo "   ✅ vercel.json"
echo "   ✅ railway.json"
echo "   ✅ render.yaml"
echo "   ✅ Dockerfile"
echo ""
echo "Just push to GitHub and import to any platform!"

