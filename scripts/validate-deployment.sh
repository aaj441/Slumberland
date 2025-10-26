#!/bin/bash

# Deployment Validation Script
# Ensures all required files and configurations are in place

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔍 Validating Deployment Configuration..."
echo "========================================="

ERRORS=0

# Check for required files
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1 (missing)"
        ((ERRORS++))
    fi
}

# Check for required directories
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
    else
        echo -e "${RED}✗${NC} $1/ (missing)"
        ((ERRORS++))
    fi
}

echo ""
echo "Checking required files..."

check_file "package.json"
check_file ".gitignore"
check_file "vercel.json"
check_file "railway.json"
check_file "render.yaml"
check_file "env.example"
check_file "docker/Dockerfile"
check_file "docker/compose.yaml"
check_file ".github/workflows/deploy.yml"

echo ""
echo "Checking required directories..."

check_dir ".github/workflows"
check_dir "docker"
check_dir "src"
check_dir "prisma"

echo ""
echo "Checking git status..."

if [ -d ".git" ]; then
    echo -e "${GREEN}✓${NC} Git repository initialized"
else
    echo -e "${YELLOW}!${NC} Git repository not initialized (will be created by deploy.sh)"
fi

if git remote -v 2>/dev/null | grep -q "origin"; then
    echo -e "${GREEN}✓${NC} Git remote configured"
else
    echo -e "${YELLOW}!${NC} Git remote not configured (will be created by deploy.sh)"
fi

echo ""
echo "Checking build configuration..."

if [ -f "package.json" ]; then
    if grep -q '"build"' package.json; then
        echo -e "${GREEN}✓${NC} Build script found"
    else
        echo -e "${RED}✗${NC} Build script not found in package.json"
        ((ERRORS++))
    fi
    
    if grep -q '"start"' package.json; then
        echo -e "${GREEN}✓${NC} Start script found"
    else
        echo -e "${RED}✗${NC} Start script not found in package.json"
        ((ERRORS++))
    fi
fi

echo ""
echo "========================================="

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "Your deployment configuration is valid."
    echo "Run ./deploy.sh to deploy."
    exit 0
else
    echo -e "${RED}❌ Found $ERRORS issue(s)${NC}"
    echo ""
    echo "Please fix the above issues before deploying."
    exit 1
fi

