-- Migration: 003_create_blacklist
-- Description: Create blacklist table for managing blacklisted users
-- Created: 2026-02-03

-- Create blacklist table
CREATE TABLE IF NOT EXISTS blacklist (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(50),
  instagram VARCHAR(255),
  reason TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for faster searches
CREATE INDEX IF NOT EXISTS idx_blacklist_phone ON blacklist(phone);
CREATE INDEX IF NOT EXISTS idx_blacklist_instagram ON blacklist(instagram);
CREATE INDEX IF NOT EXISTS idx_blacklist_name ON blacklist(name);
CREATE INDEX IF NOT EXISTS idx_blacklist_created_at ON blacklist(created_at);

-- Add comment for documentation
COMMENT ON TABLE blacklist IS 'Table for storing blacklisted users information';
COMMENT ON COLUMN blacklist.name IS 'Name of the blacklisted person';
COMMENT ON COLUMN blacklist.phone IS 'Phone number of the blacklisted person';
COMMENT ON COLUMN blacklist.instagram IS 'Instagram username of the blacklisted person';
COMMENT ON COLUMN blacklist.reason IS 'Reason for blacklisting';
COMMENT ON COLUMN blacklist.created_by IS 'User ID who created this blacklist entry';
COMMENT ON COLUMN blacklist.updated_by IS 'User ID who last updated this blacklist entry';
