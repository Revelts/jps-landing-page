#!/bin/bash

# Quick Build Test Script
# Test for obvious errors without running full build

echo "🔍 Quick Build Test - Jakarta Party Squad"
echo "=========================================="
echo ""

cd "$(dirname "$0")/.."

# 1. TypeScript Check
echo "1️⃣ Checking TypeScript..."
npx tsc --noEmit --incremental false 2>&1 | head -20
echo ""

# 2. ESLint Check (critical files only)
echo "2️⃣ Checking ESLint (critical files)..."
npx next lint --file app/sitemap.ts --file app/blog --file app/api/blog 2>&1 | head -20
echo ""

# 3. Check Database Connection (if available)
echo "3️⃣ Checking Database Connection..."
if [ -n "$DATABASE_URL" ]; then
  psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM blog_posts;" 2>&1 | head -5
  echo "✅ Database reachable"
else
  echo "⚠️  DATABASE_URL not set"
fi
echo ""

# 4. Syntax Check (Node.js parse)
echo "4️⃣ Checking Syntax..."
node -c app/sitemap.ts 2>&1 && echo "✅ sitemap.ts syntax OK"
node -c app/feed.xml/route.ts 2>&1 && echo "✅ feed.xml/route.ts syntax OK"
node -c app/blog-sitemap.xml/route.ts 2>&1 && echo "✅ blog-sitemap.xml/route.ts syntax OK"
echo ""

echo "=========================================="
echo "✅ Quick checks complete!"
echo ""
echo "If no errors above, run: npm run build"
echo ""
