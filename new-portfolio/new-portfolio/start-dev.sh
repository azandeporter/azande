#!/bin/bash

# Clean start script for the portfolio
echo "🧹 Cleaning Next.js cache..."
rm -rf .next

echo "🚀 Starting development server..."
npm run dev

echo "✅ Server should be running at http://localhost:3000 (or next available port)"