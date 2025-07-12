"use client";
import Note from "@/components/Note";
import Playlist from "@/components/Playlist";
import Link from "@/components/Link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import NavbarComponent from "@/components/Navbar";
import { addUser } from "@/lib/features/user/userSlice";

const LandingPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signup");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }

  if(session){
    dispatch(addUser(session.user))
  }  

  return (
    <div>
      <nav><NavbarComponent /></nav>
      <div className="flex h-[92vh] gap-4 p-2">
        <div className="w-3/12 overflow-hidden"><Playlist /></div>
        <div className="w-4/12 overflow-hidden"><Link /></div>
        <div className="w-5/12 overflow-hidden"><Note /></div>
      </div>
    </div>
  );
};

export default LandingPage;
