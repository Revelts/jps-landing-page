// Test the blog API endpoint directly
async function testBlogAPI() {
  try {
    console.log('🔍 Testing /api/blog endpoint...\n');

    const response = await fetch('http://localhost:3000/api/blog');
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    const data = await response.json();
    
    console.log('\n📊 API Response:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log(`\n✅ Success! Found ${data.count} posts`);
      console.log('\nPost titles:');
      data.data.forEach((post: any, index: number) => {
        console.log(`${index + 1}. ${post.title}`);
      });
    } else {
      console.log('\n❌ API returned success: false');
      console.log('Message:', data.message);
    }
    
  } catch (error) {
    console.error('❌ Error testing API:', error);
    console.log('\n💡 Make sure development server is running:');
    console.log('   npm run dev');
  }
}

testBlogAPI();
