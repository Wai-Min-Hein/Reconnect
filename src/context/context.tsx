"use client";
import axios from "axios";
import { getCookie, getCookies } from "cookies-next";
import { cookies } from "next/headers";
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


  useEffect(() => {
    const userData = async () => {
      try {
        const response = await axios.get("/api/users/me",{
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setUser(response?.data.user);
      } catch (error) {
        console.log("Token data cannot get from frontend");
      }
    };

    

    if (user == initialUser) userData();
    // else {
    //   console.log(user, "fetched user data");
    // }
  }, [user]);

  return <Context.Provider value={user}>{children}</Context.Provider>;
};

export default StateContext;
