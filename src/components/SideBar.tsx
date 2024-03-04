"use client";

import { Context } from "@/context/context";
import { Input } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { BiSolidUserAccount } from "react-icons/bi";
import { FaBookDead, FaKey, FaSearch } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";

const SideBar = () => {
  const pathname = usePathname().slice(1);

  const user = useContext(Context);

  const userName = user?.userName

  const isAdmin = user?.isAdmin;

  return (
    <div className=" w-full min-h-screen bg-[#343a40]">
      <div className="flex items-start justify-start border-b border-b-gray-300 py-4 px-4 gap-2">
        <div className="">
          <Image
            src={"/images/logoWhite.png"}
            alt="Logo"
            width={40}
            height={50}
            className="relative"
          />
        </div>
        <h1 className="text-white text-xl font-semibold">Reconnecting</h1>
      </div>

      <div className="flex items-center justify-start px-4 py-4 gap-2  border-b border-b-gray-300">
        <div className="w-10 h-10 overflow-hidden rounded-full  bg-[#292e33] shadow-xl">
          <Image
            src={"/images/avatar.png"}
            alt="Logo"
            width={50}
            height={50}
            className="relative"
          />
        </div>
        <h6 className="text-gray-200">{userName}</h6>
      </div>

      <nav className="sideNav px-2 mt-6">
        <Input
          placeholder="Search"
          className="focus:border-none"
          rightSection={<FaSearch />}
        />

        <ul className="mt-6">
          <div className="flex flex-col gap-2 border-b-2 border-b-gray-300">
            <Link href={"/myDeaths"}>
              <li
                className={`flex items-center justify-start gap-2  px-2 py-2 rounded-md cursor-pointer text-white ${
                  pathname == "myDeaths" && "bg-blue-600"
                }`}
              >
                <FaBoltLightning className=" fill-white" />
                <span>My Deaths</span>
              </li>
            </Link>

            <Link href={"/requestOc"}>
              <li
                className={`flex items-center justify-start gap-2  px-2 py-2 rounded-md cursor-pointer text-white ${
                  pathname == "requestOc" && "bg-blue-600"
                }`}
              >
                <FaBookDead className=" fill-white" />
                <span>Request OC</span>
              </li>
            </Link>
            <Link href={"/newAccount"}>
              <li
                className={`flex items-center justify-start gap-2  px-2 py-2 rounded-md cursor-pointer text-white ${
                  !isAdmin && "hidden"
                } ${pathname == "newAccount" && "bg-blue-600"}`}
              >
                <BiSolidUserAccount className=" fill-white" />
                <span>Create New Account</span>
              </li>
            </Link>
            <Link href={"/allAccounts"}>
              <li
                className={`flex items-center justify-start gap-2  px-2 py-2 rounded-md cursor-pointer text-white mb-4 ${
                  !isAdmin && "hidden"
                } ${pathname == "allAccounts" && "bg-blue-600"}`}
              >
                <BiSolidUserAccount className=" fill-white" />
                <span>All Accounts</span>
              </li>
            </Link>
          </div>
          <Link href={"/changePassword"}>
            <li
              className={`flex items-center justify-start gap-2  px-2 py-2 rounded-md cursor-pointer text-white mt-4 ${
                pathname == "changePassword" && "bg-blue-600"
              }`}
            >
              <FaKey className=" fill-white" />
              <span>Change My Password</span>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
