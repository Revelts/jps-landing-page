/**
 * Test SendGrid SMTP Connection
 * Run: npx tsx scripts/test-sendgrid.ts
 */
import { sendEmail, verifyEmailConnection, emailTemplates } from '../lib/email';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testSendGrid() {
  console.log('🧪 Testing SendGrid SMTP Configuration...\n');

  // Display configuration (hide password)
  console.log('📋 Current Configuration:');
  console.log(`   SMTP_HOST: ${process.env.SMTP_HOST}`);
  console.log(`   SMTP_PORT: ${process.env.SMTP_PORT}`);
  console.log(`   SMTP_SECURE: ${process.env.SMTP_SECURE}`);
  console.log(`   SMTP_USER: ${process.env.SMTP_USER}`);
  console.log(`   SMTP_PASS: ${process.env.SMTP_PASS ? '***' + process.env.SMTP_PASS.slice(-4) : 'NOT SET'}`);
  console.log(`   SMTP_FROM_NAME: ${process.env.SMTP_FROM_NAME}`);
  console.log(`   SMTP_FROM_EMAIL: ${process.env.SMTP_FROM_EMAIL}\n`);

  // Test 1: Verify SMTP connection
  console.log('Test 1: Verifying SMTP connection...');
  const isConnected = await verifyEmailConnection();
  
  if (!isConnected) {
    console.error('❌ SMTP connection failed! Check your credentials.\n');
    process.exit(1);
  }

  console.log('✅ SMTP connection successful!\n');

  // Test 2: Send test email
  console.log('Test 2: Sending test verification email...');
  
  // Prompt for email address
  console.log('\n⚠️  IMPORTANT: Make sure your sender email is verified in SendGrid!');
  console.log(`   Current sender: ${process.env.SMTP_FROM_EMAIL}`);
  console.log('   Go to: https://app.sendgrid.com/settings/sender_auth\n');
  
  const testEmail = process.env.SMTP_FROM_EMAIL || 'test@example.com';
  
  console.log(`   Sending test email to: ${testEmail}`);
  
  try {
    const verificationUrl = 'http://localhost:3000/verify-email?token=test-token-123';
    const emailContent = emailTemplates.verification('Test User', verificationUrl);

    await sendEmail({
      to: testEmail || 'test@example.com',
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    console.log('✅ Test email sent successfully!\n');
    console.log('📧 Check your inbox (and spam folder) for the test email.\n');
    
    console.log('🎉 All tests passed! SendGrid is configured correctly.');
    console.log('\n💡 Next steps:');
    console.log('   1. Check your email inbox');
    console.log('   2. Verify the email looks good');
    console.log('   3. Test registration on your app');
    
  } catch (error: any) {
    console.error('❌ Failed to send test email:', error.message);
    console.error('\nPossible issues:');
    console.error('   1. Check if sender email is verified in SendGrid');
    console.error('   2. Verify API key has "Mail Send" permission');
    console.error('   3. Check SendGrid dashboard for errors');
    process.exit(1);
  }
}

testSendGrid();
