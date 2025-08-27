import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/hooks";

interface User {
  name?: string;
  // add other properties if needed
}

const NavbarComponent = () => {
  const user = useAppSelector((state: { user: { user: User[] } }) => state.user.user[0])
  return (
    <div className="flex items-center justify-between p-2 bg-fuchsia-200 shadow">
      <div className="flex items-center ml-2">
        <img 
          src="./Logo.jpeg" 
          alt="SideKeeper Logo" 
          className="h-10 w-10 rounded-md"
        />
        <h1 className="ml-4 text-xl font-bold text-purple-500">SideKEEPER</h1>
      </div>
      <Avatar className="border border-cyan-400 mr-2">
        <AvatarImage />
        <AvatarFallback className="bg-cyan-600 text-white">
          {user.name || ''}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default NavbarComponent;
