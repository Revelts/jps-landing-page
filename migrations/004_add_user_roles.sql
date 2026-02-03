-- Migration: 004_add_user_roles
-- Description: Add role column to users table
-- Created: 2026-02-03

-- Create enum type for roles
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('Admin', 'Public Relation', 'Member');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add role column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'Member';

-- Update existing users to have Member role
UPDATE users 
SET role = 'Member' 
WHERE role IS NULL;

-- Create index for faster role-based queries
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Add comment for documentation
COMMENT ON COLUMN users.role IS 'User role: Admin (full access), Public Relation (limited access), Member (limited access)';
