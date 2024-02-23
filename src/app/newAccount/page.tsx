"use client";

import { Context } from "@/context/context";
import {
  Button,
  Group,
  Input,
  PasswordInput,
  Switch,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Content } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const NewAccount = () => {
  const [admin, setAdmin] = useState(true);

  const form = useForm({
    initialValues: {
      userName: "Wai Min Hein",
      email: "waiminhein@gmail.com",
      password: "11111111",
      //   termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (user: any, e: any) => {
    e?.preventDefault();
    try {
      const response = await axios.post("/api/users/signUp", user);

      console.log("Creating new user successful", response);
    } catch (error) {
      console.log("fail creating new user", error);
    }
  };

  const router = useRouter();

  const  user  = useContext(Context);
  const isAdmin = user?.isAdmin;

  useEffect(() => {
    if (!isAdmin) router.push("/myDeaths");
  });

  return isAdmin ? (
    <div className="w-full h-screen overflow-hidden relative text-black">
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
          onSubmit={form.onSubmit((user, e) => handleSubmit(user, e))}
          action=""
          className="w-[24rem]  bg-white z-50 relative rounded-md"
        >
          <div className="">
            <h1 className="text-center text-4xl font-semibold py-4 border-b border-b-gray-300 ">
              Reconnecting
            </h1>

            <p className="px-6 py-4 tracking-tighte text-sm text-center">
              Create accounts for new users
            </p>
          </div>
          <div className="px-6 py-4">
            <Input
              placeholder="Username"
              {...form.getInputProps("userName")}
              rightSection={<FaUser />}
            />
            <TextInput
              rightSection={<MdOutlineMarkEmailRead />}
              className="my-5"
              withAsterisk
              placeholder="Your Email"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              {...form.getInputProps("password")}
              placeholder="Password"
            />
            <div className="flex justify-end mt-3">
              <Group justify="center">
                <Switch
                  checked={admin}
                  onClick={() => setAdmin(!admin)}
                  {...form.getInputProps("isAdmin")}
                  size="lg"
                  onLabel="Admin"
                  offLabel="User"
                />
              </Group>
            </div>
            <div className="grid place-items-center">
              <Button
                type="submit"
                className=" mx-auto mt-4 !px-12 bg-blue-500"
              >
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="">You do not have permisson to use this feature</div>
  );
};

export default NewAccount;
