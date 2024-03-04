"use client";
import { Context } from "@/context/context";
import axios, { all } from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import { Group, Switch, Table } from "@mantine/core";

const AllAccounts = () => {
  interface User {
    _id: string;
    email: string;
    userName: string;
    isAdmin: boolean;
  }

  const router = useRouter();

  const user = useContext(Context);
  const isAdmin = user?.isAdmin;

  const [allAccounts, setAllAccounts] = useState<User[]>([]);


  const getAllAccount = async () => {
    try {
      const request = await axios.get("/api/accounts/");

      setAllAccounts(request?.data.data);
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  };

  const handleAdminStatus = async (account: User) => {
    try {
      const request = await axios.post("/api/accounts/", account);


    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  }

  const notMyAcc = allAccounts.filter(account =>  account._id != user._id)


  const rows = notMyAcc.map((account) => (
    <Table.Tr key={account._id}>
      <Table.Td>{account.userName}</Table.Td>
      <Table.Td>{account.email}</Table.Td>

      <Table.Td>



      <Group justify="center cursor-pointer">
        <Switch
          checked={account.isAdmin}
          onClick={() => handleAdminStatus(account)}

          size="lg"
          onLabel="Admin"
          offLabel="User"
        />
      </Group>
      </Table.Td>

    </Table.Tr>
  ));


  useEffect(() => {
    if (allAccounts.length <= 0) getAllAccount();

    if (!isAdmin) router.push("/myDeaths");
  }, [allAccounts, isAdmin, router]);
  return isAdmin ? (
    <div>
      <h1>All Accounts</h1>

      <div className="">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Admin</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  ) : (
    <div className="">You do not have permission to use this feature</div>
  );
};

export default AllAccounts;
