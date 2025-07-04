"use client";
import React, { createContext, useContext, useState } from "react";

interface GlobalContextType {
  jobTitle: string;
  jobDescription: string;
  salary: number;
  activeEmploymentTypes: string[];
  salaryType: string;
  negotiable: boolean;
  tags: string[];
  skills: string[];
  location: {
    country: string;
    city: string;
    address: string;
  };
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSalaryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setActiveEmploymentTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setJobDescription: React.Dispatch<React.SetStateAction<string>>;
  setSalaryType: React.Dispatch<React.SetStateAction<string>>;
  setNegotiable: React.Dispatch<React.SetStateAction<boolean>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  setLocation: React.Dispatch<React.SetStateAction<{
    country: string;
    city: string;
    address: string;
  }>>;
  resetJobForm: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  // input state
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState(0);
  const [activeEmploymentTypes, setActiveEmploymentTypes] = useState<string[]>([]);
  const [salaryType, setSalaryType] = useState("Yearly");
  const [negotiable, setNegotiable] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState({
    country: "",
    city: "",
    address: "",
  });

  // handle input change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value.trimStart());
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobDescription(e.target.value.trimStart());
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(e.target.value));
  };

  const resetJobForm = () => {
    setJobTitle("");
    setJobDescription("");
    setSalary(0);
    setActiveEmploymentTypes([]);
    setSalaryType("Yearly");
    setNegotiable(false);
    setTags([]);
    setSkills([]);
    setLocation({
      country: "",
      city: "",
      address: "",
    });
  };

  const value = {
    jobTitle,
    jobDescription,
    salary,
    activeEmploymentTypes,
    salaryType,
    negotiable,
    tags,
    skills,
    location,
    handleTitleChange,
    handleDescriptionChange,
    handleSalaryChange,
    setActiveEmploymentTypes,
    setJobDescription,
    setSalaryType,
    setNegotiable,
    setTags,
    setSkills,
    setLocation,
    resetJobForm,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
}