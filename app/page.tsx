"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LandingPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/signup');
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }

  console.log("y hai sesionmein - ", session.user)

  return <div>DashBoard, Welcome</div>;
};

export default LandingPage;
