"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { session, user } = useAuth();
  const router = useRouter()
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  } , []);

  console.log("User from Profile page"+user);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col md:p-4 w-3/4 h-3/4 md:w-2/4 md:h-4/5 my-24">
        <h1 className="text-3xl text-left w-full md:my-7 my-3">Profile</h1>
        <div className="bg-gray-900 h-5/6 rounded-lg">
          <div className="p-10">
            <div className="">
              <div className="flex justify-center h-auto">
                <img
                  src={user?.imageUrl ||  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbiUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"} 
                  alt="avatar"
                  className="h-32 object-cover w-32 rounded-full"
                />
              </div>
              <div className="mt-5 h-auto flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-white">
                  {user?.name}
                </h2>
                <p className="text-gray-400">{user?.username}</p>
                <span className="mt-10">
                  Followers: <span className="text-white">0</span>
                  <span className="mx-5">|</span>
                  Following: <span className="text-white">0</span>
                  <span className="mx-5">|</span>
                  Posts: <span className="text-white">0</span>
                </span>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-white">About</h2>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  euismod, nunc eget viverra luctus, libero ex ultricies justo,
                  nec ultricies nisl odio ac justo. Sed nec ultricies nisl.
                </p>
              </div>
              <div className="mt-10 mx-auto">

                <Button size="lg" className="pointer">
                  Your Posts
                </Button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
