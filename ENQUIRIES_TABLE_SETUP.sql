-- ============================================
-- CUSTOMER ENQUIRIES TABLE - SUPABASE SETUP
-- ============================================
-- Copy and paste this SQL in Supabase SQL Editor
-- Then click "Run" or press Ctrl+Enter

-- Create the enquiries table
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  service_interest TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  admin_notes TEXT
);

-- Enable Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone can submit enquiry (INSERT)
CREATE POLICY "Anyone can submit enquiry" 
ON enquiries FOR INSERT 
WITH CHECK (true);

-- Policy 2: Anyone can read all enquiries (SELECT)
CREATE POLICY "Anyone can read all enquiries" 
ON enquiries FOR SELECT 
USING (true);

-- Policy 3: Anyone can update enquiries (UPDATE)
CREATE POLICY "Anyone can update enquiries" 
ON enquiries FOR UPDATE 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_enquiries_email ON enquiries(email);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check table exists
-- SELECT * FROM enquiries LIMIT 1;

-- Count total enquiries
-- SELECT COUNT(*) as total_enquiries FROM enquiries;

-- View all enquiries
-- SELECT 
--   id,
--   name,
--   email,
--   phone,
--   service_interest,
--   status,
--   created_at,
--   message
-- FROM enquiries
-- ORDER BY created_at DESC;

-- View enquiries by status
-- SELECT * FROM enquiries WHERE status = 'new' ORDER BY created_at DESC;

-- ============================================
-- USEFUL UPDATE QUERIES
-- ============================================

-- Update enquiry status
-- UPDATE enquiries 
-- SET status = 'contacted' 
-- WHERE id = 'YOUR_ENQUIRY_ID';

-- Add admin notes
-- UPDATE enquiries 
-- SET admin_notes = 'Your notes here' 
-- WHERE id = 'YOUR_ENQUIRY_ID';

-- Delete old enquiries (be careful!)
-- DELETE FROM enquiries 
-- WHERE created_at < NOW() - INTERVAL '6 months' 
-- AND status = 'completed';

-- Get enquiries for specific service
-- SELECT * FROM enquiries 
-- WHERE service_interest = 'reel' 
-- ORDER BY created_at DESC;

-- Get unread enquiries
-- SELECT * FROM enquiries 
-- WHERE status = 'new' 
-- ORDER BY created_at DESC;

-- ============================================
-- TABLE STRUCTURE
-- ============================================
-- Column            Type        Nullable    Default
-- id                UUID        NO          gen_random_uuid()
-- name              TEXT        NO          -
-- email             TEXT        NO          -
-- message           TEXT        NO          -
-- phone             TEXT        YES         -
-- service_interest  TEXT        YES         -
-- status            TEXT        NO          'new'
-- created_at        TIMESTAMP   NO          NOW()
-- updated_at        TIMESTAMP   NO          NOW()
-- admin_notes       TEXT        YES         -
