export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          profile_picture: string | null
          bio: string | null
          profession: string | null
          role: 'jobseeker' | 'recruiter'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          profile_picture?: string | null
          bio?: string | null
          profession?: string | null
          role?: 'jobseeker' | 'recruiter'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          profile_picture?: string | null
          bio?: string | null
          profession?: string | null
          role?: 'jobseeker' | 'recruiter'
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          description: string
          location: string
          salary: number
          salary_type: 'Yearly' | 'Monthly' | 'Weekly' | 'Hourly'
          negotiable: boolean
          job_type: string[]
          tags: string[]
          skills: string[]
          likes: string[]
          applicants: string[]
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location?: string
          salary: number
          salary_type?: 'Yearly' | 'Monthly' | 'Weekly' | 'Hourly'
          negotiable?: boolean
          job_type: string[]
          tags: string[]
          skills: string[]
          likes?: string[]
          applicants?: string[]
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string
          salary?: number
          salary_type?: 'Yearly' | 'Monthly' | 'Weekly' | 'Hourly'
          negotiable?: boolean
          job_type?: string[]
          tags?: string[]
          skills?: string[]
          likes?: string[]
          applicants?: string[]
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}