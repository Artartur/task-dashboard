'use client'

import { useContext } from "react"
import { AuthContext } from "@/store/contexts/AuthContext"

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a UiProvider');
  }

  return context;
}
