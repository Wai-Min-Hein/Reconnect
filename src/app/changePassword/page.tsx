"use client";
import { Context } from "@/context/context";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const ChangePassword = () => {
  const router = useRouter();

  const  user  = useContext(Context);


  return (
    <div>
      <h1>Change Password</h1>
    </div>
  )
};

export default ChangePassword;
