"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Define the form validation schema using Zod
const formSchema = z.object({
  imageUrl: z.string().optional(), // Mark imageUrl as optional
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Page = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  // Initialize the form with the schema and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      name: "",
      username: "",
      title: "",
      phone: "",
      password: "",
    },
  });

  // Function to upload the image to the server
  const uploadImage = async () => {
    if (!file) return null;

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:8080/api/upload",
        formData
      );
      return response.data; // Assuming this is the URL of the uploaded image
    } catch (error) {
      console.error("Image upload failed:", error);
      setErrorMessage("Image upload failed. Please try again."); // Set error message
      return null;
    }
  };

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrorMessage(null); // Clear previous errors

    // Upload image and get the URL
    const uploadedImageUrl = await uploadImage();
    if (uploadedImageUrl) {
      values.imageUrl = uploadedImageUrl;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        values
      );
      console.log("Response", response.data);

      if (response.data) {
        console.log("User registered successfully.");
        router.push("/login");
      } else {
        console.log("User already exists.");
        setErrorMessage("User already exists."); // Set error message
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Registration failed. Please try again."); // Set error message
    }
  };

  // Handle file input change
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col md:p-4 w-3/4 md:w-1/4 md:h-4/5">
        <h1 className="text-3xl text-left w-full md:my-7 my-3">Sign Up here</h1>

        {/* Display error message */}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        {/* Image input */}
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" onChange={onImageChange} />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full max-w-lg"
          >
            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>Please enter your full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>This is your username.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Developer" {...field} />
                  </FormControl>
                  <FormDescription>Please enter your title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormDescription>Please enter your phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>Choose a secure password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
