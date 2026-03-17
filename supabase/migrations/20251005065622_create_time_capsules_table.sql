/*
  # TimeVault Database Schema

  1. New Tables
    - `time_capsules`
      - `id` (uuid, primary key)
      - `message` (text)
      - `file_url` (text, nullable)
      - `file_type` (text, nullable)
      - `delivery_method` (text) - 'email' or 'sms'
      - `delivery_target` (text)
      - `unlock_date` (timestamptz)
      - `is_delivered` (boolean, default false)
      - `created_at` (timestamptz)
      - `delivered_at` (timestamptz, nullable)

  2. Security
    - Enable RLS on `time_capsules` table
    - Capsules are sealed: no read/update/delete after creation
*/

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

ALTER TABLE time_capsules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Capsules are sealed and cannot be read"
  ON time_capsules FOR SELECT TO authenticated, anon USING (false);

CREATE POLICY "Anyone can create a time capsule"
  ON time_capsules FOR INSERT TO authenticated, anon WITH CHECK (true);

CREATE POLICY "Capsules cannot be modified"
  ON time_capsules FOR UPDATE TO authenticated, anon USING (false);

CREATE POLICY "Capsules cannot be deleted"
  ON time_capsules FOR DELETE TO authenticated, anon USING (false);

CREATE INDEX IF NOT EXISTS idx_capsules_delivery
  ON time_capsules(unlock_date, is_delivered) WHERE is_delivered = false;
