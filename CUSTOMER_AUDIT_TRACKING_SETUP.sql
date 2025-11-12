-- Create customer_audit_logs table to track all customer data changes
-- This table records every update to enquiries, orders, and customer data

CREATE TABLE IF NOT EXISTS customer_audit_logs (
  id BIGSERIAL PRIMARY KEY,
  record_type VARCHAR(50) NOT NULL, -- 'enquiry', 'order', 'signin_log'
  record_id BIGINT NOT NULL,
  field_name VARCHAR(255) NOT NULL,
  old_value TEXT,
  new_value TEXT,
  changed_by UUID, -- User who made the change
  changed_by_email VARCHAR(255),
  change_type VARCHAR(20), -- 'CREATE', 'UPDATE', 'DELETE'
  record_data JSONB, -- Full record snapshot for context
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_record_type ON customer_audit_logs(record_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_record_id ON customer_audit_logs(record_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON customer_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_changed_by ON customer_audit_logs(changed_by);

-- Enable Row Level Security
ALTER TABLE customer_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policy: Authenticated users can view audit logs (for their own records initially)
CREATE POLICY "Users can view audit logs"
  ON customer_audit_logs FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create policy: Only system/authenticated can insert audit logs
CREATE POLICY "System can insert audit logs"
  ON customer_audit_logs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- Create policy: Admin can view all audit logs
CREATE POLICY "Admin can view all audit logs"
  ON customer_audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.raw_user_meta_data->>'role' = 'admin'
        OR auth.users.email = 'admin@example.com'
      )
    )
  );

-- Create a function to log customer updates
CREATE OR REPLACE FUNCTION log_customer_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Log to audit table
  IF TG_OP = 'UPDATE' THEN
    -- For each changed field, create an audit log entry
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      INSERT INTO customer_audit_logs (
        record_type,
        record_id,
        field_name,
        old_value,
        new_value,
        change_type,
        record_data,
        changed_by_email,
        created_at
      ) VALUES (
        'enquiry',
        NEW.id,
        'status',
        OLD.status::text,
        NEW.status::text,
        'UPDATE',
        row_to_json(NEW),
        COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), 'system'),
        CURRENT_TIMESTAMP
      );
    END IF;

    IF NEW.name IS DISTINCT FROM OLD.name THEN
      INSERT INTO customer_audit_logs (
        record_type,
        record_id,
        field_name,
        old_value,
        new_value,
        change_type,
        record_data,
        changed_by_email,
        created_at
      ) VALUES (
        'enquiry',
        NEW.id,
        'name',
        OLD.name::text,
        NEW.name::text,
        'UPDATE',
        row_to_json(NEW),
        COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), 'system'),
        CURRENT_TIMESTAMP
      );
    END IF;

    IF NEW.email IS DISTINCT FROM OLD.email THEN
      INSERT INTO customer_audit_logs (
        record_type,
        record_id,
        field_name,
        old_value,
        new_value,
        change_type,
        record_data,
        changed_by_email,
        created_at
      ) VALUES (
        'enquiry',
        NEW.id,
        'email',
        OLD.email::text,
        NEW.email::text,
        'UPDATE',
        row_to_json(NEW),
        COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), 'system'),
        CURRENT_TIMESTAMP
      );
    END IF;

    IF NEW.phone IS DISTINCT FROM OLD.phone THEN
      INSERT INTO customer_audit_logs (
        record_type,
        record_id,
        field_name,
        old_value,
        new_value,
        change_type,
        record_data,
        changed_by_email,
        created_at
      ) VALUES (
        'enquiry',
        NEW.id,
        'phone',
        OLD.phone::text,
        NEW.phone::text,
        'UPDATE',
        row_to_json(NEW),
        COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), 'system'),
        CURRENT_TIMESTAMP
      );
    END IF;

    IF NEW.message IS DISTINCT FROM OLD.message THEN
      INSERT INTO customer_audit_logs (
        record_type,
        record_id,
        field_name,
        old_value,
        new_value,
        change_type,
        record_data,
        changed_by_email,
        created_at
      ) VALUES (
        'enquiry',
        NEW.id,
        'message',
        SUBSTRING(OLD.message::text, 1, 100),
        SUBSTRING(NEW.message::text, 1, 100),
        'UPDATE',
        row_to_json(NEW),
        COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), 'system'),
        CURRENT_TIMESTAMP
      );
    END IF;

  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO customer_audit_logs (
      record_type,
      record_id,
      field_name,
      new_value,
      change_type,
      record_data,
      changed_by_email,
      created_at
    ) VALUES (
      'enquiry',
      NEW.id,
      'created',
      'New enquiry created',
      'CREATE',
      row_to_json(NEW),
      COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), 'system'),
      CURRENT_TIMESTAMP
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for enquiries table
DROP TRIGGER IF EXISTS enquiries_audit_trigger ON enquiries;
CREATE TRIGGER enquiries_audit_trigger
  AFTER INSERT OR UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION log_customer_update();

-- Create a similar function for orders
CREATE OR REPLACE FUNCTION log_order_update()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      INSERT INTO customer_audit_logs (
        record_type,
        record_id,
        field_name,
        old_value,
        new_value,
        change_type,
        record_data,
        changed_by_email,
        created_at
      ) VALUES (
        'order',
        NEW.id,
        'status',
        OLD.status::text,
        NEW.status::text,
        'UPDATE',
        row_to_json(NEW),
        COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), 'system'),
        CURRENT_TIMESTAMP
      );
    END IF;

    IF COALESCE(NEW.price_estimate, 0) IS DISTINCT FROM COALESCE(OLD.price_estimate, 0) THEN
      INSERT INTO customer_audit_logs (
        record_type,
        record_id,
        field_name,
        old_value,
        new_value,
        change_type,
        record_data,
        changed_by_email,
        created_at
      ) VALUES (
        'order',
        NEW.id,
        'price_estimate',
        OLD.price_estimate::text,
        NEW.price_estimate::text,
        'UPDATE',
        row_to_json(NEW),
        COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), 'system'),
        CURRENT_TIMESTAMP
      );
    END IF;

    IF NEW.admin_notes IS DISTINCT FROM OLD.admin_notes THEN
      INSERT INTO customer_audit_logs (
        record_type,
        record_id,
        field_name,
        old_value,
        new_value,
        change_type,
        record_data,
        changed_by_email,
        created_at
      ) VALUES (
        'order',
        NEW.id,
        'admin_notes',
        SUBSTRING(OLD.admin_notes::text, 1, 100),
        SUBSTRING(NEW.admin_notes::text, 1, 100),
        'UPDATE',
        row_to_json(NEW),
        COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), 'system'),
        CURRENT_TIMESTAMP
      );
    END IF;

  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO customer_audit_logs (
      record_type,
      record_id,
      field_name,
      new_value,
      change_type,
      record_data,
      changed_by_email,
      created_at
    ) VALUES (
      'order',
      NEW.id,
      'created',
      'New order created',
      'CREATE',
      row_to_json(NEW),
      COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), 'system'),
      CURRENT_TIMESTAMP
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for orders table
DROP TRIGGER IF EXISTS orders_audit_trigger ON orders;
CREATE TRIGGER orders_audit_trigger
  AFTER INSERT OR UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION log_order_update();

-- Create a view for easy audit log access
CREATE OR REPLACE VIEW customer_audit_summary AS
SELECT
  id,
  record_type,
  record_id,
  field_name,
  old_value,
  new_value,
  change_type,
  changed_by_email,
  created_at,
  created_at::date as change_date
FROM customer_audit_logs
ORDER BY created_at DESC;
