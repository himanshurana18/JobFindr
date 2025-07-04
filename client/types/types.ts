interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  salary_type: "Yearly" | "Monthly" | "Weekly" | "Hourly";
  negotiable: boolean;
  job_type: string[];
  tags: string[];
  likes: string[];
  skills: string[];
  applicants: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    id: string;
    name: string | null;
    profile_picture: string | null;
  };
}

interface Profile {
  id: string;
  email: string;
  name: string | null;
  profile_picture: string | null;
  bio: string | null;
  profession: string | null;
  role: 'jobseeker' | 'recruiter';
  created_at: string;
  updated_at: string;
}

export type { Job, Profile };