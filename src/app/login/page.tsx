"use client"

  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm } from "react-hook-form"
  import { z } from "zod"
  import { useRouter } from "next/navigation"
  import { useState } from "react"

  import axios from "axios"

  import { Button } from "@/components/ui/button"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  // import { Separator } from "@radix-ui/react-dropdown-menu"

  import { useAuth } from "@/context/AuthProvider"

  const formSchema = z.object({
    username: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })

  const Page = () => {
    const { login } = useAuth();
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        await login(values);
      } catch (error) {
        console.error("Login failed", error);
      }
    }

    return (
      <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col md:p-4 w-3/4 h-3/4 md:w-1/4 md:h-4/5 my-24"> 
        
        <h1 className="text-3xl text-left w-full md:my-7 my-3">Login here</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full max-w-lg" 
          >
            
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a secure password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        {error && <p>{error}</p>}
        </div>
      </div>
    )
  }

  export default Page
