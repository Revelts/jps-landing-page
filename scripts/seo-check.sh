#!/bin/bash

# SEO Health Check Script
# Check all SEO-critical endpoints and configurations

echo "🔍 SEO Health Check - Jakarta Party Squad"
echo "=========================================="
echo ""

BASE_URL="${1:-https://jakartapartysquad.com}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check function
check_endpoint() {
  local url=$1
  local name=$2
  
  echo -n "Checking $name... "
  
  status_code=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  
  if [ "$status_code" = "200" ]; then
    echo -e "${GREEN}✅ OK${NC} (HTTP $status_code)"
    return 0
  else
    echo -e "${RED}❌ FAILED${NC} (HTTP $status_code)"
    return 1
  fi
}

# 1. Check Sitemaps
echo "📄 Checking Sitemaps..."
echo "----------------------"
check_endpoint "$BASE_URL/sitemap.xml" "Main Sitemap"
check_endpoint "$BASE_URL/blog-sitemap.xml" "Blog Sitemap"
check_endpoint "$BASE_URL/feed.xml" "RSS Feed"
echo ""

# 2. Check Robots.txt
echo "🤖 Checking Robots.txt..."
echo "-------------------------"
check_endpoint "$BASE_URL/robots.txt" "robots.txt"
echo ""

# 3. Check Critical Pages
echo "📱 Checking Critical Pages..."
echo "-----------------------------"
check_endpoint "$BASE_URL" "Homepage"
check_endpoint "$BASE_URL/blog" "Blog List"
check_endpoint "$BASE_URL/events" "Events"
check_endpoint "$BASE_URL/schedule" "Schedule"
check_endpoint "$BASE_URL/hosting/gratis" "Hosting Gratis"
echo ""

# 4. Check OpenGraph Image
echo "🖼️  Checking OpenGraph Image..."
echo "-------------------------------"
check_endpoint "$BASE_URL/assets/images/header.jpg" "Header Image (OG)"
echo ""

# 5. Validate Sitemap XML
echo "✅ Validating Sitemap Structure..."
echo "----------------------------------"

sitemap_content=$(curl -s "$BASE_URL/sitemap.xml")
if echo "$sitemap_content" | grep -q "<urlset"; then
  echo -e "${GREEN}✅ Main sitemap has valid XML structure${NC}"
else
  echo -e "${RED}❌ Main sitemap XML invalid${NC}"
fi

if echo "$sitemap_content" | grep -q "<url>"; then
  url_count=$(echo "$sitemap_content" | grep -c "<url>")
  echo -e "${GREEN}✅ Found $url_count URLs in main sitemap${NC}"
else
  echo -e "${RED}❌ No URLs found in sitemap${NC}"
fi
echo ""

# 6. Check Blog Sitemap
echo "📝 Checking Blog Sitemap..."
echo "---------------------------"
blog_sitemap=$(curl -s "$BASE_URL/blog-sitemap.xml")
if echo "$blog_sitemap" | grep -q "<url>"; then
  blog_count=$(echo "$blog_sitemap" | grep -c "<url>")
  echo -e "${GREEN}✅ Found $blog_count blog posts in sitemap${NC}"
else
  echo -e "${YELLOW}⚠️  No blog posts in sitemap (or error)${NC}"
fi
echo ""

# 7. Check RSS Feed
echo "📰 Checking RSS Feed..."
echo "-----------------------"
rss_content=$(curl -s "$BASE_URL/feed.xml")
if echo "$rss_content" | grep -q "<rss"; then
  echo -e "${GREEN}✅ RSS feed has valid structure${NC}"
  
  if echo "$rss_content" | grep -q "<item>"; then
    item_count=$(echo "$rss_content" | grep -c "<item>")
    echo -e "${GREEN}✅ Found $item_count items in RSS feed${NC}"
  fi
else
  echo -e "${RED}❌ RSS feed invalid or empty${NC}"
fi
echo ""

# 8. Check Meta Tags (sample from homepage)
echo "🏷️  Checking Meta Tags (Homepage)..."
echo "------------------------------------"
homepage=$(curl -s "$BASE_URL")

# Check OpenGraph
if echo "$homepage" | grep -q 'property="og:title"'; then
  echo -e "${GREEN}✅ og:title found${NC}"
else
  echo -e "${RED}❌ og:title missing${NC}"
fi

if echo "$homepage" | grep -q 'property="og:image"'; then
  echo -e "${GREEN}✅ og:image found${NC}"
else
  echo -e "${RED}❌ og:image missing${NC}"
fi

if echo "$homepage" | grep -q 'property="og:description"'; then
  echo -e "${GREEN}✅ og:description found${NC}"
else
  echo -e "${RED}❌ og:description missing${NC}"
fi

# Check Twitter Card
if echo "$homepage" | grep -q 'name="twitter:card"'; then
  echo -e "${GREEN}✅ twitter:card found${NC}"
else
  echo -e "${RED}❌ twitter:card missing${NC}"
fi
echo ""

# 9. Check Structured Data
echo "📊 Checking Structured Data..."
echo "-------------------------------"
if echo "$homepage" | grep -q 'application/ld+json'; then
  schema_count=$(echo "$homepage" | grep -c 'application/ld+json')
  echo -e "${GREEN}✅ Found $schema_count JSON-LD schemas${NC}"
else
  echo -e "${RED}❌ No structured data found${NC}"
fi
echo ""

# 10. Performance Check
echo "⚡ Performance Hints..."
echo "----------------------"
echo "Run these commands for detailed checks:"
echo ""
echo "  • PageSpeed: https://pagespeed.web.dev/?url=$BASE_URL"
echo "  • Mobile Test: https://search.google.com/test/mobile-friendly?url=$BASE_URL"
echo "  • Rich Results: https://search.google.com/test/rich-results?url=$BASE_URL"
echo "  • Facebook OG: https://developers.facebook.com/tools/debug/?q=$BASE_URL"
echo ""

# Summary
echo "=========================================="
echo "📊 SEO Check Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Submit sitemaps to Google Search Console"
echo "2. Test OpenGraph with Facebook Debugger"
echo "3. Monitor indexing in GSC Coverage report"
echo "4. Run: node scripts/test-opengraph.js"
echo ""
