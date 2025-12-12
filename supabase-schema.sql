-- ============================================
-- SUPABASE SQL SCHEMA FOR RESUME-CRAFT
-- ============================================
-- Run these queries in your Supabase SQL Editor
-- Dashboard > SQL Editor > New Query

-- ============================================
-- 1. CREATE RESUMES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Resume',
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);

-- ============================================
-- 2. AUTO-UPDATE TIMESTAMP TRIGGER
-- ============================================
-- This function updates the updated_at column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create the trigger
DROP TRIGGER IF EXISTS update_resumes_updated_at ON resumes;
CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON resumes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. RLS POLICIES
-- ============================================
-- Policy: Users can view only their own resumes
DROP POLICY IF EXISTS "Users can view own resumes" ON resumes;
CREATE POLICY "Users can view own resumes"
  ON resumes
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own resumes
DROP POLICY IF EXISTS "Users can create own resumes" ON resumes;
CREATE POLICY "Users can create own resumes"
  ON resumes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update only their own resumes
DROP POLICY IF EXISTS "Users can update own resumes" ON resumes;
CREATE POLICY "Users can update own resumes"
  ON resumes
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete only their own resumes
DROP POLICY IF EXISTS "Users can delete own resumes" ON resumes;
CREATE POLICY "Users can delete own resumes"
  ON resumes
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 5. NEW: TEMPLATE ID COLUMN (Run this if you haven't!)
-- ============================================
-- This saves which template (e.g. 'professional', 'creative') the user selected.
ALTER TABLE resumes ADD COLUMN IF NOT EXISTS template_id TEXT DEFAULT 'professional';

-- ============================================
-- VERIFICATION QUERIES (Optional)
-- ============================================
-- Run these to verify your setup:

-- Check if table was created:
-- SELECT * FROM resumes LIMIT 1;

-- Check RLS is enabled:
-- SELECT relname, relrowsecurity FROM pg_class WHERE relname = 'resumes';

-- Check policies:
-- SELECT policyname, permissive, roles, cmd, qual, with_check 
-- FROM pg_policies WHERE tablename = 'resumes';
