-- Migration: 002_add_email_verification
-- Description: Add email verification columns to users table
-- Created: 2026-02-03

-- Add email verification columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token_expires TIMESTAMP;

-- Create index on verification token for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);

-- Create index on email_verified for queries
CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users(email_verified);
