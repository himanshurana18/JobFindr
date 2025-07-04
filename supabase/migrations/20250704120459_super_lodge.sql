/*
  # Initial Schema Setup for JobFindr

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `name` (text, nullable)
      - `profile_picture` (text, nullable)
      - `bio` (text, nullable)
      - `profession` (text, nullable)
      - `role` (enum: jobseeker, recruiter)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `location` (text)
      - `salary` (integer)
      - `salary_type` (enum: Yearly, Monthly, Weekly, Hourly)
      - `negotiable` (boolean)
      - `job_type` (text array)
      - `tags` (text array)
      - `skills` (text array)
      - `likes` (text array)
      - `applicants` (text array)
      - `created_by` (uuid, references profiles)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to jobs
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('jobseeker', 'recruiter');
CREATE TYPE salary_type AS ENUM ('Yearly', 'Monthly', 'Weekly', 'Hourly');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text,
  profile_picture text,
  bio text DEFAULT 'No bio provided',
  profession text DEFAULT 'Job Seeker',
  role user_role DEFAULT 'jobseeker',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text DEFAULT 'Remote',
  salary integer NOT NULL,
  salary_type salary_type DEFAULT 'Yearly',
  negotiable boolean DEFAULT false,
  job_type text[] NOT NULL,
  tags text[] DEFAULT '{}',
  skills text[] NOT NULL,
  likes text[] DEFAULT '{}',
  applicants text[] DEFAULT '{}',
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Jobs policies
CREATE POLICY "Anyone can read jobs"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own jobs"
  ON jobs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, profile_picture)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();