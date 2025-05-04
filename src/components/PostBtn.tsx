"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GiFeather } from "react-icons/gi";
import { Form, FormControl, FormField, FormItem, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePosts } from "@/context/PostsContext";
import { useAuth } from "@/context/AuthProvider"; 

const FormSchema = z.object({
  content: z.string().nonempty("Please enter some content."),
});

export function PostBtn() {
  const { refetchPosts } = usePosts(); 
  const { user, session } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const authToken = Cookies.get("authToken");


    const postData = {
      ...data,
      user:user, 
    };

    try {
      const response = await axios.post("http://localhost:8080/api/post", postData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data !== "") {
        toast({
          description: "Your post has been created.",
        });
        setIsOpen(false); 
        refetchPosts();   
        form.reset();     
      }
    } catch (error) {
      console.error("Failed to create the post.", error);
    }
  };

  return (
   session ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
      <Button
        variant="outline"
        className="fixed h-16 w-16 rounded-full md:rounded-lg md:h-10 md:w-32 right-5 bottom-5 dark:text-white text-white hover:text-white dark:bg-[#1a8cd8] dark:hover:bg-[#1576b7] bg-black hover:bg-gray-900"
      >
        <span className="md:block hidden">Post</span>
        <span className="md:hidden block">
          <GiFeather size={28} />
        </span>
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Post</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts with the world."
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
    ) : null
  );
}
