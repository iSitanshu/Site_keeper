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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Playlist />
        {/* <Link />
        <Note /> */}
      </div>
    </div>
  );
};

export default LandingPage;
