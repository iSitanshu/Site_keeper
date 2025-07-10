"use client";
import Note from "@/components/Note";
import Playlist from "@/components/Playlist";
import Link from "@/components/Link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import NavbarComponent from "@/components/Navbar";

const LandingPage = () => {
  const router = useRouter();
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

  return (
    <div>
      <nav><NavbarComponent user={session.user.name ?? ""} /></nav>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Playlist userId={session.user.id} />
        <Link userId={session.user.id} />
        <Note userId={session.user.id} />
      </div>
    </div>
  );
};

export default LandingPage;
