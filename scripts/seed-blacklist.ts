/**
 * Blacklist Seeder Script
 * Seeds the blacklist table with initial data from blacklist.json
 * Usage: npx tsx scripts/seed-blacklist.ts
 */

// IMPORTANT: Load environment variables FIRST before any other imports
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Now import other modules
import { sql } from '../lib/db';
import blacklistData from '../data/blacklist.json';

async function seedBlacklist() {
  try {
    console.log('🌱 Starting blacklist seeder...');
    
    // Check if data already exists
    const existingData = await sql`SELECT COUNT(*) as count FROM blacklist`;
    const count = existingData[0]?.count || 0;
    
    if (count > 0) {
      console.log(`⚠️  Blacklist table already has ${count} records.`);
      const shouldContinue = process.env.FORCE_SEED === 'true';
      
      if (!shouldContinue) {
        console.log('ℹ️  Use FORCE_SEED=true to clear and re-seed the data.');
        return;
      }
      
      console.log('🗑️  Clearing existing blacklist data...');
      await sql`TRUNCATE TABLE blacklist RESTART IDENTITY CASCADE`;
    }
    
    console.log(`📥 Inserting ${blacklistData.length} blacklist records...`);
    
    // Insert all records
    for (const record of blacklistData) {
      await sql`
        INSERT INTO blacklist (name, phone, instagram, reason, created_at)
        VALUES (
          ${record.name === '-' ? null : record.name},
          ${record.phone},
          ${record.instagram === '-' ? null : record.instagram},
          ${record.reason},
          ${record.createdAt}::timestamp
        )
      `;
    }
    
    // Verify insertion
    const result = await sql`SELECT COUNT(*) as count FROM blacklist`;
    const insertedCount = result[0]?.count || 0;
    
    console.log(`✅ Successfully seeded ${insertedCount} blacklist records!`);
    
    // Show ALL inserted data
    const allRecords = await sql`
      SELECT id, name, phone, instagram, reason, created_at
      FROM blacklist 
      ORDER BY id ASC
    `;
    
    console.log('\n📋 All blacklist records in database:');
    console.table(allRecords.map((record: any) => ({
      id: record.id,
      name: record.name || '-',
      phone: record.phone || '-',
      instagram: record.instagram || '-',
      reason: record.reason,
    })));
    
  } catch (error) {
    console.error('❌ Error seeding blacklist:', error);
    throw error;
  }
}

// Run seeder
seedBlacklist()
  .then(() => {
    console.log('\n🎉 Blacklist seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Blacklist seeding failed:', error);
    process.exit(1);
  });
