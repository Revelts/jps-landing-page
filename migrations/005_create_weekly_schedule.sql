-- Migration: Create weekly_schedule table
-- Description: Store venue events for weekly schedule display
-- Created: 2026-02-03

-- Create weekly_schedule table
CREATE TABLE IF NOT EXISTS weekly_schedule (
  id SERIAL PRIMARY KEY,
  event_date DATE NOT NULL,
  venue_name VARCHAR(255) NOT NULL,
  venue_address TEXT NOT NULL,
  artist_dj VARCHAR(255) NOT NULL,
  genres TEXT[] NOT NULL DEFAULT '{}',
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_weekly_schedule_event_date ON weekly_schedule(event_date);
CREATE INDEX idx_weekly_schedule_venue_name ON weekly_schedule(venue_name);
CREATE INDEX idx_weekly_schedule_created_by ON weekly_schedule(created_by);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_weekly_schedule_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_weekly_schedule_updated_at
  BEFORE UPDATE ON weekly_schedule
  FOR EACH ROW
  EXECUTE FUNCTION update_weekly_schedule_updated_at();

-- Add comment
COMMENT ON TABLE weekly_schedule IS 'Weekly venue events schedule';
COMMENT ON COLUMN weekly_schedule.genres IS 'Array of music genres for the event';
COMMENT ON COLUMN weekly_schedule.created_by IS 'Admin user who created this event';
