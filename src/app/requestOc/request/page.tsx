"use client";

import React, { useContext, useEffect, useRef, useState } from "react";

import { Context } from "@/context/context";

import { Button, Group, Box, Select, Input } from "@mantine/core";

import { useForm } from "@mantine/form";
import axios from "axios";
import { BsFillPlusCircleFill } from "react-icons/bs";

import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { FaRegEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Page = () => {
  interface RequestInterface {
    mainHand: String;
    offHand: String;
    head: String;
    armor: String;
    shoe: String;
  }

  interface AllReqInterface {
    _id: String;
    mainHandData: [string];
    offHandData: [string];
    headData: [string];
    armorData: [string];
    shoeData: [string];
  }

  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);

  const user = useContext(Context);

  const form = useForm({
    initialValues: {
      mainHand: "",
      offHand: "",
      head: "",
      armor: "",
      shoe: "",
      // termsOfService: false,
    },
  });

  const handleSubmit = async (request: RequestInterface, e: any) => {
    e.preventDefault();
    const reqData = { userId: user?._id, ...request, userName: user?.userName };
    try {
      const req = await axios.post("/api/request/requestedOc", reqData);

      router.push("/requestOc");
      // console.log(req.data.data);
    } catch (error) {
      console.log("Error in fronted", error);
    }
  };

  const [addedTitle, setAddedTitle] = useState("");

  const [mainHandActive, setMainHandActive] = useState(false);
  const [offHandActive, setOffHandActive] = useState(false);
  const [headActive, setHeadActive] = useState(false);
  const [armorActive, setArmorActive] = useState(false);
  const [shoeActive, setShoeActive] = useState(false);

  const ref = React.useRef<HTMLInputElement>(null);

  const [allReqData, setAllReqData] = useState<AllReqInterface[]>([]);

  const getAllReqsData = async () => {
    try {
      const req = await axios.get("/api/request/requestedOcData");
      const requests = req?.data?.data;

      setAllReqData(requests);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getAllReqsData();
  }, []);

  const updateData = async (data: any, addedTitle: any, name: any) => {
    const isTitleInclude = data?.includes(addedTitle);
    if (!isTitleInclude && addedTitle != "") {
      data.push(addedTitle);

      try {
        const res = await axios.put("/api/request/requestedOcData", {
          name,
          allReq: allReqData[0],
        });
      } catch (error) {
        console.log("error", error);
      }
      if (ref?.current) ref.current.value = "";
    }
  };

  const deleteData = async (modalData: any, data: any, name: any) => {
    let index = modalData?.indexOf(data);

    if (index !== -1) {
      modalData?.splice(index, 1);
    }

    try {
      const res = await axios.put("/api/request/requestedOcData", {
        name,

        allReq: allReqData[0],
      });
    } catch (error) {
      console.log("error", error);
    }

    // try {
    //   const res = await axios.put("/api/request/requestedOcData", {
    //     name,
    //     data: allReqData[0]?.[name],
    //     allReq: allReqData[0],
    //   });
    // } catch (error) {
    //   console.log("error", error);
    // }
  };

  const modalData =
    (mainHandActive && allReqData[0]?.mainHandData) ||
    (offHandActive && allReqData[0]?.offHandData) ||
    (headActive && allReqData[0]?.headData) ||
    (armorActive && allReqData[0]?.armorData) ||
    (shoeActive && allReqData[0]?.shoeData) ||
    [];

  const maniHandData = allReqData[0]?.mainHandData;

  const offHandData = allReqData[0]?.offHandData;
  const head = allReqData[0]?.headData;
  const armor = allReqData[0]?.armorData;
  const shoe = allReqData[0]?.shoeData;

  return (
    <div className="bg-white min-h-screen relative text-gray-700">
      <div className="flex justify-center">
        <h1 className="text-2xl ">{user?.userName}</h1>
      </div>

      <Modal
        opened={opened}
        onClose={() => (
          close(),
          (setMainHandActive(false),
          setOffHandActive(false),
          setHeadActive(false),
          setArmorActive(false),
          setShoeActive(false))
        )}
        title="Edit Title"
        centered
      >
        <div className="">
          <Input
            ref={ref}
            onChange={(event) => setAddedTitle(event.currentTarget.value)}
            placeholder="Add new data"
            rightSectionPointerEvents="all"
            rightSection={
              <BsFillPlusCircleFill
                onClick={() =>
                  (mainHandActive &&
                    updateData(modalData, addedTitle, "mainHandData")) ||
                  (offHandActive &&
                    updateData(modalData, addedTitle, "offHandData")) ||
                  (headActive &&
                    updateData(modalData, addedTitle, "headData")) ||
                  (armorActive &&
                    updateData(modalData, addedTitle, "armorData")) ||
                  (shoeActive && updateData(modalData, addedTitle, "shoeData"))
                }
                className="cursor-pointer"
                size={16}
              />
            }
          />
        </div>
        {modalData?.map((data, index) => (
          <div key={index} className="py-2">
            <div className="flex items-center justify-between">
              <h6 className="flex-1">{data}</h6>
              <button
                onClick={() =>
                  (mainHandActive &&
                    deleteData(modalData, data, "mainHandData")) ||
                  (offHandActive &&
                    deleteData(modalData, data, "offHandData")) ||
                  (headActive && deleteData(modalData, data, "headData")) ||
                  (armorActive && deleteData(modalData, data, "armorData")) ||
                  (shoeActive && deleteData(modalData, data, "shoeData"))
                }
                className="px-4 py-1 rounded-md bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </Modal>

      <div className="box">
        <Box maw={340} mx="auto">
          <form
            onSubmit={form.onSubmit((request: RequestInterface, e: any) =>
              handleSubmit(request, e)
            )}
          >
            <div className="flex items-end justify-start gap-4">
              <Select
                className="flex-1"
                label="Select your main hand"
                placeholder="Main hand or Blank"
                data={maniHandData}
                {...form.getInputProps("mainHand")}
              />
              <button
                type="button"
                onClick={() => (open(), setMainHandActive(true))}
              >
                <FaRegEye />
              </button>
            </div>

            <div className="flex items-end justify-start gap-4">
              <Select
                label="Select off main hand"
                placeholder="Off hand or Blank"
                data={offHandData}
                className="flex-1"
                {...form.getInputProps("offHand")}
              />

              <button
                type="button"
                onClick={() => (open(), setOffHandActive(true))}
              >
                <FaRegEye />
              </button>
            </div>

            <div className="flex items-end justify-start gap-4">
              <Select
                label="Select head"
                placeholder="head Blank"
                data={head}
                className="flex-1"
                {...form.getInputProps("head")}
              />

              <button
                type="button"
                onClick={() => (open(), setHeadActive(true))}
              >
                <FaRegEye />
              </button>
            </div>

            <div className="flex items-end justify-start gap-4">
              <Select
                label="Select armor"
                placeholder="armor or Blank"
                data={armor}
                className="flex-1"
                {...form.getInputProps("armor")}
              />

              <button
                type="button"
                onClick={() => (open(), setArmorActive(true))}
              >
                <FaRegEye />
              </button>
            </div>

            <div className="flex items-end justify-start gap-4">
              <Select
                label="Select shoe"
                placeholder="shoe or Blank"
                data={shoe}
                className="flex-1"
                {...form.getInputProps("shoe")}
              />

              <button
                type="button"
                onClick={() => (open(), setShoeActive(true))}
              >
                <FaRegEye />
              </button>
            </div>

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Page;
