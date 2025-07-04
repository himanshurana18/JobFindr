"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Job } from "@/types/types";
import { useAuth } from "./authContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface JobsContextType {
  jobs: Job[];
  userJobs: Job[];
  loading: boolean;
  searchQuery: {
    tags: string;
    location: string;
    title: string;
  };
  filters: {
    fullTime: boolean;
    partTime: boolean;
    internship: boolean;
    contract: boolean;
    fullStack: boolean;
    backend: boolean;
    devOps: boolean;
    uiUx: boolean;
  };
  minSalary: number;
  maxSalary: number;
  createJob: (jobData: any) => Promise<void>;
  searchJobs: (tags?: string, location?: string, title?: string) => Promise<void>;
  likeJob: (jobId: string) => Promise<void>;
  applyToJob: (jobId: string) => Promise<void>;
  deleteJob: (jobId: string) => Promise<void>;
  handleSearchChange: (searchName: string, value: string) => void;
  handleFilterChange: (filterName: string) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<{
    tags: string;
    location: string;
    title: string;
  }>>;
  setFilters: React.Dispatch<React.SetStateAction<{
    fullTime: boolean;
    partTime: boolean;
    internship: boolean;
    contract: boolean;
    fullStack: boolean;
    backend: boolean;
    devOps: boolean;
    uiUx: boolean;
  }>>;
  setMinSalary: React.Dispatch<React.SetStateAction<number>>;
  setMaxSalary: React.Dispatch<React.SetStateAction<number>>;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState({
    tags: "",
    location: "",
    title: "",
  });

  const [filters, setFilters] = useState({
    fullTime: false,
    partTime: false,
    internship: false,
    contract: false,
    fullStack: false,
    backend: false,
    devOps: false,
    uiUx: false,
  });

  const [minSalary, setMinSalary] = useState(30000);
  const [maxSalary, setMaxSalary] = useState(120000);

  const getJobs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          profiles:created_by (
            id,
            name,
            profile_picture
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        return;
      }

      setJobs(data || []);
    } catch (error) {
      console.error('Error in getJobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: any) => {
    if (!user) {
      toast.error('Please sign in to create a job');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          title: jobData.title,
          description: jobData.description,
          location: jobData.location,
          salary: jobData.salary,
          salary_type: jobData.salaryType,
          job_type: jobData.jobType,
          tags: jobData.tags,
          skills: jobData.skills,
          negotiable: jobData.negotiable,
          created_by: user.id,
        })
        .select(`
          *,
          profiles:created_by (
            id,
            name,
            profile_picture
          )
        `)
        .single();

      if (error) {
        console.error('Error creating job:', error);
        toast.error('Error creating job');
        return;
      }

      toast.success('Job created successfully');
      setJobs((prevJobs) => [data, ...prevJobs]);
      
      if (profile?.id) {
        await getUserJobs(profile.id);
      }

      await getJobs();
      router.push(`/job/${data.id}`);
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Error creating job');
    }
  };

  const getUserJobs = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          profiles:created_by (
            id,
            name,
            profile_picture
          )
        `)
        .eq('created_by', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user jobs:', error);
        return;
      }

      setUserJobs(data || []);
    } catch (error) {
      console.error('Error in getUserJobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async (tags?: string, location?: string, title?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('jobs')
        .select(`
          *,
          profiles:created_by (
            id,
            name,
            profile_picture
          )
        `);

      if (title) {
        query = query.ilike('title', `%${title}%`);
      }

      if (location) {
        query = query.ilike('location', `%${location}%`);
      }

      if (tags) {
        query = query.contains('tags', [tags]);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching jobs:', error);
        return;
      }

      setJobs(data || []);
    } catch (error) {
      console.error('Error in searchJobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const likeJob = async (jobId: string) => {
    if (!user) {
      toast.error('Please sign in to like jobs');
      return;
    }

    try {
      const job = jobs.find(j => j.id === jobId);
      if (!job) return;

      const isLiked = job.likes.includes(user.id);
      const updatedLikes = isLiked
        ? job.likes.filter(id => id !== user.id)
        : [...job.likes, user.id];

      const { error } = await supabase
        .from('jobs')
        .update({ likes: updatedLikes })
        .eq('id', jobId);

      if (error) {
        console.error('Error liking job:', error);
        toast.error('Error liking job');
        return;
      }

      toast.success(isLiked ? 'Job unliked' : 'Job liked');
      await getJobs();
    } catch (error) {
      console.error('Error liking job:', error);
      toast.error('Error liking job');
    }
  };

  const applyToJob = async (jobId: string) => {
    if (!user) {
      toast.error('Please sign in to apply for jobs');
      return;
    }

    try {
      const job = jobs.find(j => j.id === jobId);
      if (!job) return;

      if (job.applicants.includes(user.id)) {
        toast.error('You have already applied to this job');
        return;
      }

      const updatedApplicants = [...job.applicants, user.id];

      const { error } = await supabase
        .from('jobs')
        .update({ applicants: updatedApplicants })
        .eq('id', jobId);

      if (error) {
        console.error('Error applying to job:', error);
        toast.error('Error applying to job');
        return;
      }

      toast.success('Applied to job successfully');
      await getJobs();
    } catch (error) {
      console.error('Error applying to job:', error);
      toast.error('Error applying to job');
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!user) {
      toast.error('Please sign in to delete jobs');
      return;
    }

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId)
        .eq('created_by', user.id);

      if (error) {
        console.error('Error deleting job:', error);
        toast.error('Error deleting job');
        return;
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      setUserJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      toast.success('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Error deleting job');
    }
  };

  const handleSearchChange = (searchName: string, value: string) => {
    setSearchQuery((prev) => ({ ...prev, [searchName]: value }));
  };

  const handleFilterChange = (filterName: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    if (profile?.id) {
      getUserJobs(profile.id);
    }
  }, [profile?.id]);

  const value = {
    jobs,
    userJobs,
    loading,
    searchQuery,
    filters,
    minSalary,
    maxSalary,
    createJob,
    searchJobs,
    likeJob,
    applyToJob,
    deleteJob,
    handleSearchChange,
    handleFilterChange,
    setSearchQuery,
    setFilters,
    setMinSalary,
    setMaxSalary,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
}