// Simple Node.js fetch to see actual API response
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/blog',
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

console.log('🔍 Fetching http://localhost:3000/api/blog...\n');

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  console.log('\n📄 Response Body:\n');

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
    console.log('\n\n📊 Parsed JSON:\n');
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2));
      console.log(`\n✅ Found ${json.count} posts`);
    } catch (e) {
      console.log('❌ Not valid JSON!');
      console.log('Raw data:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error);
});

req.end();
