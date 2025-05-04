// services/likeService.ts
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import Cookies from "js-cookie";

// Define request and response types
export interface LikeRequest {
  postId: number;
  userId: number;
}

export interface LikeResponse {
  id: number; // Example field, update with actual response fields
  postId: number;
  userId: number;
  createdAt: string;
}

// var token = Cookies.get("authToken")

// Add a like
// Add a like
export const addLike = async (likeRequest: LikeRequest) => {
  const token = Cookies.get("authToken"); // Fetch token dynamically
  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const response = await axios.post(
    `http://localhost:8080/api/likes/add`,
    likeRequest, // Pass the payload directly
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Explicitly set content type
      },
    }
  );
  return response.data;
};

// Delete a like
export const deleteLike = async (likeRequest: LikeRequest) => {
  const token = Cookies.get("authToken"); // Fetch token dynamically
  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const response = await axios.post(
    `http://localhost:8080/api/likes/delete`,
    likeRequest, // Pass the payload directly
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Explicitly set content type
      },
    }
  );
  return response.data;
};



export const isLiked = async (postId:number, userId: number) => {
  const token = Cookies.get("authToken"); // Fetch token dynamically
  if (!token) {
    throw new Error("Authorization token is missing");
  }
  const response = await axios.get("http://localhost:8080/api/likes/isLiked", {
    params: {postId,userId},
    headers: {
      Authorization: `Bearer ${token}`,
    }
      });
  console.log("response from my function IsLiked: ", response.data);
  return response.data;

}

// Get all likes by post
export const getLikesByPost = async (postId: number) => {
  const token = Cookies.get("authToken"); // Fetch token dynamically
  if (!token) {
    throw new Error("Authorization token is missing");
  }
  const response = await axios.get(`http://localhost:8080/api/likes/getallbypost/${postId}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return response.data;
};

// Get all likes by user
export const getLikesByUser = async (userId: number)=> {
  const token = Cookies.get("authToken"); // Fetch token dynamically
  if (!token) {
    throw new Error("Authorization token is missing");
  }
  const response = await axios.get(`http://localhost:8080/api/likes/getallbyuser/${userId}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return response.data;
};
