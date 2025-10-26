#!/bin/bash
set -e

echo "Building Slumberland..."

# Install dependencies
pnpm install

# Generate Prisma client and TanStack Router
pnpm prisma generate
pnpm tsr generate

# Build the application
pnpm build

echo "Build complete!"

