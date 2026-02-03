/**
 * Test SendGrid API (@sendgrid/mail)
 * Run: npx tsx scripts/test-sendgrid-api.ts
 */
import { sendEmail, verifyEmailConnection, emailTemplates } from '../lib/email';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testSendGridAPI() {
  console.log('🧪 Testing SendGrid API (@sendgrid/mail)...\n');

  // Display configuration
  console.log('📋 Configuration:');
  console.log(`   SENDGRID_API_KEY: ${process.env.SENDGRID_API_KEY ? '***' + process.env.SENDGRID_API_KEY.slice(-8) : 'NOT SET'}`);
  console.log(`   SMTP_FROM_NAME: ${process.env.SMTP_FROM_NAME}`);
  console.log(`   SMTP_FROM_EMAIL: ${process.env.SMTP_FROM_EMAIL}\n`);

  // Test 1: Verify API key
  console.log('Test 1: Verifying SendGrid API key...');
  const isValid = await verifyEmailConnection();
  
  if (!isValid) {
    console.error('❌ SendGrid API key not configured!\n');
    process.exit(1);
  }

  console.log('✅ SendGrid API key is set!\n');

  // Test 2: Send test verification email
  console.log('Test 2: Sending test verification email...');
  
  const testEmail = process.env.SMTP_FROM_EMAIL || 'test@example.com';
  console.log(`   Sending to: ${testEmail}`);
  console.log(`   From: ${process.env.SMTP_FROM_NAME} <${testEmail}>\n`);
  
  try {
    const verificationUrl = 'http://localhost:3000/verify-email?token=test-token-123456';
    const emailContent = emailTemplates.verification('Test User', verificationUrl);

    await sendEmail({
      to: testEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      withLogo: true,
    });

    console.log('✅ Test email sent successfully!\n');
    console.log('📧 Check your inbox at:', testEmail);
    console.log('   (Also check spam/junk folder)\n');
    
    console.log('🎉 All tests passed! SendGrid API is working correctly.');
    console.log('\n💡 Next steps:');
    console.log('   1. Check your email inbox');
    console.log('   2. Verify the email looks good');
    console.log('   3. Test registration: npm run dev');
    console.log('   4. Register at http://localhost:3000\n');
    
    process.exit(0);
    
  } catch (error: any) {
    console.error('❌ Failed to send test email');
    console.error('\nError details:', error.message);
    
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check if sender email is verified in SendGrid');
    console.error('   2. Go to: https://app.sendgrid.com/settings/sender_auth');
    console.error('   3. Verify API key has "Mail Send" permission');
    console.error('   4. Check SendGrid Activity: https://app.sendgrid.com/activity\n');
    
    process.exit(1);
  }
}

testSendGridAPI();
