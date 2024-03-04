"use client";

import { Context } from "@/context/context";
import { Button, Input, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";

const Login = () => {

  
  const form = useForm({
    initialValues: {
      email: "waiminhein@gmail.com",
      password: "11111111",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const router = useRouter()

  const handleLogin = async (user: any, e: any) => {
    try {

      const reqBody = await axios.post("/api/users/login", user)
      router.push('/myDeaths')

      localStorage.setItem('email', user.email)
    


      

    } catch (error) {
      console.log("Error in login frontend", error);
    }
  };

  return (
    <div className=" w-screen h-screen overflow-hidden">
      <div className="w-full h-[131vh] absolute mt-[-31vh] z-10">
        <Image
          className=" relative"
          src={"/siam.png"}
          alt="Logo"
          objectFit="contain"
          layout="fill"
          objectPosition="right bottom"
        />
      </div>
      <div className="grid place-items-center w-full h-full">
        <form
          onSubmit={form.onSubmit((user,e) => handleLogin(user,e))}

          action=""
          className="w-[24rem]  bg-white z-50 relative rounded-md"
        >
          <div className="">
            <h1 className="text-center text-4xl font-semibold py-4 border-b border-b-gray-300 ">
              Reconnecting
            </h1>

            <p className="px-6 py-4 tracking-tighte text-sm text-center">
              Please login to use Reconnecting Admin
            </p>
          </div>
          <div className="px-6 py-4">
            <Input
              {...form.getInputProps("email")}
              placeholder="Email"
              rightSection={<FaUser />}
            />
            <PasswordInput
              {...form.getInputProps("password")}
              className="mt-5"
              placeholder="Password"
            />
            <div className="grid place-items-center">
              <Button type="submit" className="!bg-blue-500 mx-auto mt-4 !px-12">Sign in</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
