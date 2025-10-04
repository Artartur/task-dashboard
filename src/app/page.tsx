"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "./hooks/useAuth";
import Loading from "./components/Loading";

export default function Home() {
  const { state } = useAuth();
  const {
    isAuthenticated,
    loading
  } = state;

  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, loading, router]);

  return (
    <Loading />
  );
}
