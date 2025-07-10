import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  user: string;
}

const NavbarComponent: React.FC<NavbarProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-white shadow">
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
          {user}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default NavbarComponent;
