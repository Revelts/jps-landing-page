/**
 * OpenGraph Test Script
 * Test semua OpenGraph tags untuk berbagai platform
 * 
 * Usage:
 * node scripts/test-opengraph.js [url]
 * 
 * Example:
 * node scripts/test-opengraph.js https://jakartapartysquad.com/blog
 */

const https = require('https');
const http = require('http');

const testUrls = [
  'https://jakartapartysquad.com',
  'https://jakartapartysquad.com/blog',
  'https://jakartapartysquad.com/events',
  'https://jakartapartysquad.com/community',
];

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractMetaTags(html) {
  const tags = {
    og: {},
    twitter: {},
    article: {},
    other: {}
  };
  
  // Extract og: tags
  const ogRegex = /<meta\s+property=["']og:([^"']+)["']\s+content=["']([^"']+)["']/g;
  let match;
  while ((match = ogRegex.exec(html)) !== null) {
    tags.og[match[1]] = match[2];
  }
  
  // Extract twitter: tags
  const twitterRegex = /<meta\s+name=["']twitter:([^"']+)["']\s+content=["']([^"']+)["']/g;
  while ((match = twitterRegex.exec(html)) !== null) {
    tags.twitter[match[1]] = match[2];
  }
  
  // Extract article: tags
  const articleRegex = /<meta\s+property=["']article:([^"']+)["']\s+content=["']([^"']+)["']/g;
  while ((match = articleRegex.exec(html)) !== null) {
    tags.article[match[1]] = match[2];
  }
  
  // Extract title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) {
    tags.other.title = titleMatch[1];
  }
  
  // Extract description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/);
  if (descMatch) {
    tags.other.description = descMatch[1];
  }
  
  return tags;
}

function validateTags(tags, url) {
  const issues = [];
  
  // Check required OG tags
  const requiredOg = ['title', 'description', 'image', 'url', 'type'];
  requiredOg.forEach(tag => {
    if (!tags.og[tag]) {
      issues.push(`❌ Missing og:${tag}`);
    }
  });
  
  // Check image dimensions
  if (!tags.og['image:width'] || !tags.og['image:height']) {
    issues.push(`⚠️  Missing og:image dimensions (recommended for WhatsApp)`);
  }
  
  // Check Twitter card
  if (!tags.twitter.card) {
    issues.push(`❌ Missing twitter:card`);
  }
  
  // Check image URL
  if (tags.og.image && !tags.og.image.startsWith('http')) {
    issues.push(`❌ og:image must be absolute URL`);
  }
  
  return issues;
}

async function testUrl(url) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing: ${url}`);
  console.log('='.repeat(60));
  
  try {
    const html = await fetchHtml(url);
    const tags = extractMetaTags(html);
    const issues = validateTags(tags, url);
    
    // Display OpenGraph tags
    console.log('\n📱 OpenGraph (Facebook, WhatsApp, LinkedIn):');
    Object.keys(tags.og).forEach(key => {
      console.log(`  og:${key}: ${tags.og[key]}`);
    });
    
    // Display Twitter tags
    console.log('\n🐦 Twitter Card:');
    Object.keys(tags.twitter).forEach(key => {
      console.log(`  twitter:${key}: ${tags.twitter[key]}`);
    });
    
    // Display Article tags (if any)
    if (Object.keys(tags.article).length > 0) {
      console.log('\n📰 Article Tags (Blog Posts):');
      Object.keys(tags.article).forEach(key => {
        console.log(`  article:${key}: ${tags.article[key]}`);
      });
    }
    
    // Display basic tags
    console.log('\n📄 Basic Meta:');
    console.log(`  title: ${tags.other.title || 'Not found'}`);
    console.log(`  description: ${tags.other.description || 'Not found'}`);
    
    // Display validation results
    console.log('\n✅ Validation:');
    if (issues.length === 0) {
      console.log('  ✅ All required tags present!');
      console.log('  ✅ Ready for social media sharing');
    } else {
      console.log('  Issues found:');
      issues.forEach(issue => {
        console.log(`    ${issue}`);
      });
    }
    
    // WhatsApp specific check
    console.log('\n💬 WhatsApp Preview:');
    if (tags.og.image && tags.og.title && tags.og.description) {
      console.log('  ✅ Will show rich preview in WhatsApp');
      console.log(`  Preview will show:`);
      console.log(`    - Image: ${tags.og.image}`);
      console.log(`    - Title: ${tags.og.title}`);
      console.log(`    - Description: ${tags.og.description.substring(0, 100)}...`);
    } else {
      console.log('  ❌ Missing required tags for WhatsApp preview');
    }
    
  } catch (error) {
    console.log(`\n❌ Error testing ${url}:`);
    console.log(`   ${error.message}`);
  }
}

async function main() {
  const urlToTest = process.argv[2];
  
  if (urlToTest) {
    // Test specific URL
    await testUrl(urlToTest);
  } else {
    // Test all predefined URLs
    console.log('🧪 Testing OpenGraph for Jakarta Party Squad\n');
    console.log('Will test the following URLs:');
    testUrls.forEach(url => console.log(`  - ${url}`));
    
    for (const url of testUrls) {
      await testUrl(url);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('Testing complete!');
    console.log('='.repeat(60));
    console.log('\n💡 Tips:');
    console.log('  - Use Facebook Debugger to scrape and cache: https://developers.facebook.com/tools/debug/');
    console.log('  - WhatsApp cache clears after ~7 days');
    console.log('  - Test individual URLs: node scripts/test-opengraph.js [url]');
  }
}

main().catch(console.error);
