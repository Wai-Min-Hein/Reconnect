'use client'
import { Context } from '@/context/context';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const AllAccounts = () => {

  
  const router = useRouter();

  const  user  = useContext(Context);
  const isAdmin = user?.isAdmin;

  useEffect(() => {
    if (!isAdmin) router.push("/myDeaths");
  }, []);
  return (
    isAdmin? <div>
      <h1>All Accounts</h1>
    </div>:
    <div className="">
      You do not have permission to use this feature
    </div>
  )
}

export default AllAccounts
