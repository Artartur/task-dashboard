"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "./hooks/useAuth";
import Loading from "./components/Loading";

export default function Home() {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.loading) {
      if (state.isAuthenticated) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [state.isAuthenticated, state.loading, router]);

  return (
    <Loading />
  );
}
