'use client';

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import Loading from "./Loading";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { state } = useAuth();
  const {
    isAuthenticated,
    loading
  } = state;
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) return router.push('/login');
  }, [isAuthenticated, loading, router]);

  if (state.loading) return <Loading />;

  if (!isAuthenticated) return null;

  return (
    <div className="w-screen h-screen">
      {children}
    </div>
  )
}
