#!/bin/bash

# Automated Deployment Script for Melatonin
# This script sets up git, pushes to GitHub, and configures deployment

set -e

echo "🚀 Melatonin Deployment Automation"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Are you in the Melatonin directory?${NC}"
    exit 1
fi

# Step 1: Ensure git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing git repository...${NC}"
    git init
    git branch -M main
fi

# Step 2: Create .env from template if it doesn't exist
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env file from template...${NC}"
    cp env.example .env
    echo -e "${GREEN}✓ Created .env file created. Please edit it with your credentials.${NC}"
fi

# Step 3: Add all files
echo -e "${YELLOW}Adding files to git...${NC}"
git add .

# Step 4: Initial commit if needed
if git diff --staged --quiet; then
    echo -e "${YELLOW}No changes to commit.${NC}"
else
    echo -e "${YELLOW}Creating initial commit...${NC}"
    git commit -m "Initial commit with automated deployment setup"
fi

# Step 5: Setup GitHub remote (interactive)
echo -e "${YELLOW}Setup GitHub Remote${NC}"
echo "Enter your GitHub username:"
read GITHUB_USERNAME

echo "Enter your repository name (default: Melatonin):"
read REPO_NAME
REPO_NAME=${REPO_NAME:-Melatonin}

# Check if remote already exists
if git remote | grep -q "origin"; then
    echo -e "${GREEN}Remote 'origin' already exists. Skipping...${NC}"
else
    git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
    echo -e "${GREEN}✓ Added remote: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git${NC}"
fi

# Step 6: Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
if git push -u origin main 2>&1 | grep -q "error\|fatal"; then
    echo -e "${RED}Push failed. You may need to create the repository on GitHub first.${NC}"
    echo -e "${YELLOW}Repository URL: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}${NC}"
    echo "Please create it and run this script again."
else
    echo -e "${GREEN}✓ Successfully pushed to GitHub${NC}"
fi

# Step 7: Display next steps
echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Deployment Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. ${YELLOW}Set up environment variables:${NC}"
echo "   - Vercel: https://vercel.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/environment-variables"
echo "   - Railway: railway.app → Your project → Variables"
echo "   - Render: dashboard.render.com → Your service → Environment"
echo ""
echo "2. ${YELLOW}Deploy to Vercel (easiest):${NC}"
echo "   Visit: https://vercel.com/new/${GITHUB_USERNAME}/${REPO_NAME}"
echo ""
echo "3. ${YELLOW}Deploy to Railway:${NC}"
echo "   Visit: https://railway.app/new"
echo "   Connect GitHub → Select ${REPO_NAME}"
echo ""
echo "4. ${YELLOW}Deploy to Render:${NC}"
echo "   Visit: https://dashboard.render.com"
echo "   New Web Service → Connect GitHub → Select ${REPO_NAME}"
echo ""
echo -e "${GREEN}Your app is configured for automatic deployment!${NC}"
echo "Any push to main will automatically trigger deployment on all platforms."

