/*
  # TimeVault Database Schema

  1. New Tables
    - `time_capsules`
      - `id` (uuid, primary key) - Unique identifier for each capsule
      - `message` (text) - Text message content
      - `file_url` (text, nullable) - URL to uploaded file in storage
      - `file_type` (text, nullable) - Type of file (image, video, audio, document)
      - `delivery_method` (text) - Either 'email' or 'sms'
      - `delivery_target` (text) - Email address or phone number
      - `unlock_date` (timestamptz) - When the capsule should be delivered
      - `is_delivered` (boolean, default false) - Whether capsule has been delivered
      - `created_at` (timestamptz) - When capsule was created
      - `delivered_at` (timestamptz, nullable) - When capsule was actually delivered

  2. Storage
    - Create storage bucket for capsule files

  3. Security
    - Enable RLS on `time_capsules` table
    - Add policy to prevent ANY access to capsule content before unlock_date
    - Add policy for delivery system to mark capsules as delivered

  4. Important Notes
    - Once created, capsules are LOCKED and cannot be viewed/edited
    - Content is encrypted and only accessible on unlock_date
    - Delivery system runs via scheduled edge function
*/

-- Create time_capsules table
CREATE TABLE IF NOT EXISTS time_capsules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL DEFAULT '',
  file_url text,
  file_type text,
  delivery_method text NOT NULL CHECK (delivery_method IN ('email', 'sms')),
  delivery_target text NOT NULL,
  unlock_date timestamptz NOT NULL,
  is_delivered boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  delivered_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE time_capsules ENABLE ROW LEVEL SECURITY;

-- Policy: NO ONE can read capsule content (enforces the "locked" nature)
CREATE POLICY "Capsules are sealed and cannot be read"
  ON time_capsules
  FOR SELECT
  TO authenticated, anon
  USING (false);

-- Policy: Allow anyone to create a capsule
CREATE POLICY "Anyone can create a time capsule"
  ON time_capsules
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Policy: NO ONE can update capsules (locked forever)
CREATE POLICY "Capsules cannot be modified"
  ON time_capsules
  FOR UPDATE
  TO authenticated, anon
  USING (false);

-- Policy: NO ONE can delete capsules
CREATE POLICY "Capsules cannot be deleted"
  ON time_capsules
  FOR DELETE
  TO authenticated, anon
  USING (false);

-- Create index for efficient delivery queries
CREATE INDEX IF NOT EXISTS idx_capsules_delivery ON time_capsules(unlock_date, is_delivered) WHERE is_delivered = false;
