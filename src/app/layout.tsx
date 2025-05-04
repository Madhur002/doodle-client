import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { PostBtn } from "@/components/PostBtn";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthProvider";
import { PostsProvider } from "@/context/PostsContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doodle",
  description: "Write your thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="m-0 p-0 overflow-y-scroll dark:bg-[#09090b]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <PostsProvider>
            
            <Navbar />
            {children}
            <PostBtn />
            <Toaster />
            {/* <Footer /> */}
            </PostsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
