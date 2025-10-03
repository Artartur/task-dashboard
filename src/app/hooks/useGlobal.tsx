'use client'

import { useContext } from "react"
import { GlobalContext } from "@/store/contexts/GlobalContext";

export function useGlobal() {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }

  return context;
}
