"use client"; 

import React from "react";
import { Skeleton } from "./ui/skeleton";
import Doodles from "./Doodles";
import { usePosts } from "@/context/PostsContext"; 
import { useEffect } from "react";

const HeroSection = () => {
  const { posts, loading } = usePosts(); 

  return (
    <div className="mt-24 mb-16">
      {!loading ? 
        (!posts.length ? (
          <div className="flex items-center justify-center h-96">
            <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-400">
              No posts to display
            </h1>
          </div>
        ):(
          <Doodles posts={posts} />
        )

      ) : (
        <div className="flex flex-col md:px-5 px-5 max-w-lg mx-auto h-auto space-y-10">
          <div className="space-y-2">
            <Skeleton className="h-[150px] w-full rounded-2xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-[250px] w-full rounded-2xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-[150px] w-full rounded-2xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
