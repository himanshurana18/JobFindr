"use client";
import React from "react";
import { AuthProvider } from "@/context/authContext";
import { JobsProvider } from "@/context/jobsContext";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return (
    <AuthProvider>
      <JobsProvider>{children}</JobsProvider>
    </AuthProvider>
  );
}

export default ContextProvider;