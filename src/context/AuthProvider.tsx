"use client";

// context/AuthContext.tsx
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AuthContextProps {
  session: boolean;
  login: (values: LoginValues) => Promise<void>;
  logout: () => void;
  user: any;
}

interface LoginValues {
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('authToken');
    setSession(!!token);
    if(token) {
      fetchUser().then((data) => {
        setUser(data);
      }
    );
    }
  }, []);

  const login = async (values: LoginValues) => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", values);
      const token = response.data;
      if(!token) {
        throw new Error("No token received");
      }
      Cookies.set('authToken', token, { expires: 1 }); // Set cookie to expire in 1 day
      const user = fetchUser().then(data => {
        setUser(data);
      })
      console.log("User: ", user);
      console.log("Token: ", token);
      setSession(true);
      router.push("/profile");
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed in frontend", error);
    }
  };

  const fetchUser = async () => {
    try {
        const token = Cookies.get('authToken'); // Get the token from cookies
        console.log('Token from cookies:', token);
        const response = await axios.get("http://localhost:8080/api/user", {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token with Bearer prefix
            },
        });
        return response.data;   // Return the user data
    } catch (error) {
        console.error("Failed to fetch user data", error);
        return null; // Return null in case of an error
    }
};



  const logout = () => {
    Cookies.remove('authToken');
    setSession(false);
    router.push('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ session, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
