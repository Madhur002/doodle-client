"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

interface PostsContextType {
  posts: any[];
  loading: boolean;
  refetchPosts: () => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllPosts = async () => {
    try {
      // Using axiosInstance for API call
      const response = await axiosInstance.get("/post");
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error in fetching posts:", error);
      setLoading(false); // Ensure loading is set to false in case of error
    }
  };

  // Fetch posts on mount
  useEffect(() => {
    getAllPosts();
  }, []);

  const value = {
    posts,
    loading,
    refetchPosts: getAllPosts, // Expose the function to refetch posts
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
