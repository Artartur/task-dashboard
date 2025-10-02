'use client';

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import Loading from "./Loading";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.loading && !state.isAuthenticated) return router.push('/login');
  }, [state.isAuthenticated, state.loading, router]);

  if (state.loading) return <Loading />;

  if (!state.isAuthenticated) return null;

  return (
    <>
      {children}
    </>
  )
}
