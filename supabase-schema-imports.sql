-- ============================================
-- 6. IMPORT LIMITS
-- ============================================
CREATE TABLE IF NOT EXISTS import_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    imported_at TIMESTAMPTZ DEFAULT NOW(),
    file_type TEXT
);

CREATE INDEX IF NOT EXISTS idx_import_logs_user_timestamp ON import_logs(user_id, imported_at);

ALTER TABLE import_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert own import logs" ON import_logs;
CREATE POLICY "Users can insert own import logs" 
    ON import_logs 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own import logs" ON import_logs;
CREATE POLICY "Users can view own import logs" 
    ON import_logs 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Check limit function (optional usage, can also be done via query)
-- Count imports in the last hour
