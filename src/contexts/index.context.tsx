"use client";
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

// Wrap Children with Providers
const ContextProviders = ({ children }: ProvidersProps) => {
  return <>{children}</>;
};

export default ContextProviders;
