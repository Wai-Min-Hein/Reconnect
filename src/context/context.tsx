"use client";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { createContext, useEffect, useState } from "react";

interface User {
  _id: string;
  userName: string;
  email: string;
  isAdmin: boolean;
}

interface ContextProviderType {
  children: React.ReactNode;
}

const initialUser: User = {
  _id: "",
  userName: "",
  email: "",
  isAdmin: false,
};

export const Context = createContext<User>(initialUser);

const StateContext = ({ children }: ContextProviderType) => {
  const [user, setUser] = useState<User>(initialUser);


  const cookies = useCookies();

  const token: any =JSON.stringify(cookies.get("token")) ;


  useEffect(() => {
    const userData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response?.data.user);
      } catch (error) {
        console.log("Token data cannot get from frontend");
      }
    };

    const userData2 = async () => {
      try {
        const response = await axios.post("/api/users/me", token);
        setUser(response?.data.user);
        console.log(response.data.user, 'user post method');
      } catch (error) {
        console.log("Token data cannot get from frontend");
      }
    };

    if (user == initialUser) 
    userData2();
  }, [user, token]);

  return <Context.Provider value={user}>{children}</Context.Provider>;
};

export default StateContext;
