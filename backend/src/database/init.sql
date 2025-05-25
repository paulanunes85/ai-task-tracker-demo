-- Initialize database schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) DEFAULT 'General',
  priority VARCHAR(20) DEFAULT 'Medium',
  status VARCHAR(20) DEFAULT 'pending',
  ai_suggested_category VARCHAR(50),
  ai_suggested_priority VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE
  ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for demo
INSERT INTO tasks (title, description, category, priority, ai_suggested_category, ai_suggested_priority) VALUES
  ('Complete quarterly financial report', 'Analyze Q4 revenue and expenses for board presentation', 'Work', 'High', 'Work', 'High'),
  ('Schedule dentist appointment', 'Regular checkup needed', 'Personal', 'Medium', 'Personal', 'Medium'),
  ('Learn React Query', 'Study advanced data fetching patterns', 'Learning', 'Low', 'Learning', 'Low'),
  ('Fix production bug', 'Users reporting login issues on mobile devices', 'Urgent', 'High', 'Urgent', 'High'),
  ('Team standup meeting', 'Daily sync with development team', 'Work', 'Medium', 'Work', 'Medium');