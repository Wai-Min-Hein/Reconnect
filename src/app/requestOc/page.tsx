"use client";

import React, { useContext, useEffect, useState } from "react";

import { Select, Table } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Context } from "@/context/context";
import axios from "axios";
import RequestOcRender from "@/components/RequestOcRender";

const RequesteOc = () => {
  const user = useContext(Context);

  const userId = user?._id;

  const isAdmin = user?.isAdmin;

  interface ReqsType {
    _id: string;
    time: string;
    userId: string;
    mainHand: string;
    offHand: string;
    head: string;
    armor: string;
    shoe: string;
    reqStatus: string;
    createdAt: string;
    userName: string;
  }

  const [reqs, setReqs] = useState<ReqsType[]>([]);

  const myReqs = isAdmin ? reqs : reqs?.filter((req) => req?.userId == userId);

  const getAllReqs = async () => {
    try {
      const req = await axios.get("/api/request/getAllRequestedOc");
      const requests = req?.data?.requests;

      // console.log(requests, 'all request data from all users')

      setReqs(requests);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getAllReqs();
  }, []);

  const router = useRouter();

  const rows = myReqs.map((req, index) => (
    <RequestOcRender key={index} req={req} user={user} index={index} />
  ));

  return (
    <div className="bg-white">
      <div className="flex flex-col justify-between h-screen py-3 text-gray-700">
        <h1 className="text-center text-2xl">My Request List</h1>

        <div className="px-4 mt-4 flex-1 h-full overflow-auto">
          <Table.ScrollContainer minWidth={500}>
            <Table withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>No</Table.Th>
                  <Table.Th>User Name</Table.Th>
                  <Table.Th>Time</Table.Th>
                  <Table.Th>Main Hand</Table.Th>
                  <Table.Th>Off Hand</Table.Th>
                  <Table.Th>Armor</Table.Th>
                  <Table.Th>Shoe</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </div>

        <div className="mx-auto">
          <button
            onClick={() => router.push("/requestOc/request")}
            className="bg-blue-600 py-2 px-4 rounded-md text-white"
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequesteOc;





