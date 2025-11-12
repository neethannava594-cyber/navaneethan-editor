-- Create signin_logs table to track customer sign-in data
CREATE TABLE IF NOT EXISTS signin_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(20),
  sign_in_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  sign_out_time TIMESTAMP WITH TIME ZONE,
  ip_address VARCHAR(50),
  user_agent TEXT,
  device_type VARCHAR(50),
  session_duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_signin_logs_user_id ON signin_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_signin_logs_sign_in_time ON signin_logs(sign_in_time DESC);
CREATE INDEX IF NOT EXISTS idx_signin_logs_email ON signin_logs(email);

-- Enable Row Level Security
ALTER TABLE signin_logs ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can view their own signin logs
CREATE POLICY "Users can view their own signin logs"
  ON signin_logs FOR SELECT
  USING (user_id = auth.uid());

-- Create policy: Only authenticated users can insert signin logs
CREATE POLICY "Authenticated users can insert signin logs"
  ON signin_logs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy: Users can update their own signin logs (for logout)
CREATE POLICY "Users can update their own signin logs"
  ON signin_logs FOR UPDATE
  USING (user_id = auth.uid());

-- Create policy: Admin can view all signin logs
-- You'll need to implement admin role checking separately
CREATE POLICY "Admin can view all signin logs"
  ON signin_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );
