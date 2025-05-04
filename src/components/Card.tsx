"use client";

import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  addLike,
  deleteLike,
  isLiked,
  getLikesByPost,
  LikeRequest,
} from "@/services/likeService";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  imageUrl: string;
  timeStamp: string;
  postId: number; // For backend interactions
  userId: number; // For backend interactions
}

const Card: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  title,
  imageUrl,
  timeStamp,
  postId,
  userId,
}) => {
  const [liked, setLiked] = useState(false); // Track if the current user has liked the post
  const [likes, setLikes] = useState(0); // Total like count

  useEffect(() => {
    // Fetch initial like status and count
    const fetchLikeStatus = async () => {
      try {
        const hasLiked = await isLiked(postId, userId);
          setLiked(hasLiked);

        const postLikes = await getLikesByPost(postId);
        setLikes(postLikes.length); // Assuming the response contains all likes for the post
      } catch (error) {
        console.error("Error fetching like data:", error);
      }
    };

    fetchLikeStatus();
  }, [postId, userId]);

  const toggleLike = async () => {
    const likeRequest: LikeRequest = { postId, userId };

    try {
      if (liked) {
        await deleteLike(likeRequest);
        setLiked(false);
        setLikes((prevLikes) => prevLikes - 1);
      } else {
        await addLike(likeRequest);
        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="md:mt-8 mt-5">
      {/* Testimonial Content */}
      <div className="max-w-lg w-full mx-auto border dark:border-gray-800 border-gray-300 shadow-md dark:shadow-sm shadow-gray-200 dark:shadow-black text-white rounded-xl p-6 flex items-center space-x-4">
        <div className="w-full">
          <div className="flex gap-x-5">
            <img
              className="w-14 h-12 rounded-full object-cover"
              src={imageUrl}
              alt={name}
            />
            <div className="flex justify-between w-full">
              <div>
                <div className="flex md:flex-row flex-col md:text-lg text-md font-medium dark:text-white text-black">
                  <span>{name}</span>
                  <span className="dark:text-gray-500 text-gray-600 md:pl-2">
                    {timeStamp}
                  </span>
                </div>
                <div className="w-full text-sm dark:text-gray-400 text-gray-600">
                  {title}
                </div>
              </div>
              <Button className="">Follow</Button>
            </div>
          </div>
          <p className="md:text-lg md:min-w-lg text-md dark:text-gray-400 text-gray-600 mt-4">
            {quote}
          </p>
        </div>
      </div>

      {/* Reaction Section */}
      <div className="mt-2 max-w-lg mx-auto border dark:border-gray-800 border-gray-300 rounded-lg shadow-md dark:shadow-sm shadow-gray-200 dark:shadow-black">
        <div className="flex justify-around p-2">
          <div className="flex items-center space-x-2">
            {/* Like/Unlike Icon */}
            {liked ? (
              <FaHeart
                className="w-6 h-6 cursor-pointer transition text-red-700 fill-red-500 hover:scale-125"
                onClick={toggleLike}
              />
            ) : (
              <FaRegHeart
                className="w-6 h-6 cursor-pointer transition text-gray-500 hover:text-red-500 hover:scale-125"
                onClick={toggleLike}
              />
            )}
            <span className="text-gray-400">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
