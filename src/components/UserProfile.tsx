import { CalendarIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { useEffect, useState } from "react";

import { formatDistanceToNow } from "date-fns";


export function UserProfile() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="flex justify-center items-center">
          <Avatar className="h-10 w-10 ">
            <AvatarImage src={user?.imageUrl || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbiUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"} />
            {/* <AvatarFallback>VC</AvatarFallback> */}
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-76 h-60 space-y-8">
        <div className="w-full flex justify-between space-x-4">
          <Avatar className="h-16 w-16 ">
            <AvatarImage src={user?.imageUrl || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbiUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"} />
            {/* <AvatarFallback>VC</AvatarFallback> */}
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-lg font-semibold"> {user?.name} </h4>
            <p className="text-sm">{user?.title || "Doodler"}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
              {user?.createdAt ? (formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })) : ("Joined recently")}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <Link href="/profile">
            <Button className="w-full">Profile</Button>
          </Link>
          <Button className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
