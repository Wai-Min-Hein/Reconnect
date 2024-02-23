"use client";

import { Select, Table } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

interface User {
  _id: string;
  userName: string;
  email: string;
  isAdmin: boolean;
}
interface ReqInterface {
  _id: string;
  userId: string;
  userName: string;
  reqStatus: string;
  head: string;
  armor: string;
  shoe: string;
  mainHand: string;
  offHand: string;
  createdAt: string;
}

interface Props {
  req: ReqInterface;
  user: User;
  index: number;
}

const RequestOcRender = ({ req, user, index }: Props) => {
  const [status, setStatus] = useState(req?.reqStatus);

  const updateStatus = async (req: any) => {
    try {
      const requestBody = await axios.put("/api/request/changeReq", req);
      console.log(requestBody);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (status != req.reqStatus) updateStatus({ ...req, status });
  }, [status, req]);

  return (
    <Table.Tr>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{req?.userName}</Table.Td>
      <Table.Td>{req?.createdAt}</Table.Td>
      <Table.Td>{req?.mainHand}</Table.Td>

      <Table.Td>{req?.offHand}</Table.Td>

      <Table.Td>{req?.armor}</Table.Td>
      <Table.Td>{req?.shoe}</Table.Td>
      <Table.Td className="inline-block w-40">
        {user?.isAdmin ? (
          <Select
            data={["approved", "processing"]}
            defaultValue={req?.reqStatus}
            onChange={(type: any) => setStatus(type)}
          />
        ) : (
          req?.reqStatus
        )}
      </Table.Td>
    </Table.Tr>
  );
};

export default RequestOcRender;
