"use client"
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  TextInput,
  Table,
} from "@mantine/core";
import Image from "next/image";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import Footer from "@/components/Footer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Context } from "@/context/context";
import RequestOcRender from "@/components/RequestOcRender";

const Mydeaths = () => {


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


  const user = useContext(Context);


  const userId = user?._id;
  const UserName = user?.userName;

  const isAdmin = user?.isAdmin;

  
  const [allReqData, setAllReqData] = useState<ReqsType[]>([]);

  const getAllReqsData = async () => {
    try {
      const req = await axios.get("/api/request/getAllRequestedOc");
      const requests = req?.data?.requests;

      setAllReqData(requests);
    } catch (error) {
      console.log("Error", error);
    }
  };

 

  
  
  // const elements = [
  //   {
  //     no: 1,
  //     time: "2024-01-15 14:40:20",
  //     victim: "Master Zan",
  //     victimGear: [
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg",
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg"
  //     ],
  //     killFame: "180,343,334",
  //     killer: "Wai Min Hein",
  //     killerGuide: "Radlant",
  //     killerGear: [
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg",
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg"
  //     ],
  //     status: "waiting",
  //     details: "See Details",
  //   },{
  //     no: 1,
  //     time: "2024-01-15 14:40:20",
  //     victim: "Master Zan",
  //     victimGear: [
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg",
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg"
  //     ],
  //     killFame: "180,343,334",
  //     killer: "Wai Min Hein",
  //     killerGuide: "Radlant",
  //     killerGear: [
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg",
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg"
  //     ],
  //     status: "waiting",
  //     details: "See Details",
  //   },{
  //     no: 1,
  //     time: "2024-01-15 14:40:20",
  //     victim: "Master Zan",
  //     victimGear: [
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg",
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg"
  //     ],
  //     killFame: "180,343,334",
  //     killer: "Wai Min Hein",
  //     killerGuide: "Radlant",
  //     killerGear: [
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg",
  //       "https://i.pinimg.com/474x/92/15/21/921521aa91aab5108209a594bfa1170d.jpg"
  //     ],
  //     status: "waiting",
  //     details: "See Details",
  //   },
  // ];

  // const rows = elements.map((element, index) => (
  //   <Table.Tr key={index}>
  //     <Table.Td>{element.no}</Table.Td>
  //     <Table.Td>{element.time}</Table.Td>
  //     <Table.Td>{element.victim}</Table.Td>
  //     <Table.Td className="flex items-center justify-start gap-1 flex-wrap">{element.victimGear?.map((img, index) => (
  //       <div key={index} className="w-10 h-10 overflow-hidden rounded-md basis-[23%]">
  //         <Image alt="Photo" width={40} height={40} src={img} />
  //       </div>
  //     ))}</Table.Td>
  //     <Table.Td>{element.killFame}</Table.Td>
  //     <Table.Td>{element.killer}</Table.Td>
  //     <Table.Td>{element.killerGuide}</Table.Td>
  //     <Table.Td className="flex items-center justify-start gap-1 flex-wrap">{element.killerGear?.map((img, index) => (
  //       <div key={index} className="w-10 h-10 overflow-hidden rounded-md basis-[23%]">
  //         <Image alt="Photo" width={40} height={40} src={img} />
  //       </div>
  //     ))}</Table.Td>
  //     <Table.Td>{element.status}</Table.Td>
  //     <Table.Td>{element.details}</Table.Td>
  //   </Table.Tr>
  // ));
const router = useRouter()


// const {user} = useContext(Context)
const myReqs = isAdmin ? allReqData : allReqData?.filter((req) => req?.userId == userId);

const approvedReq = myReqs?.filter(req => req.reqStatus == 'approved')



useEffect(() => {
  getAllReqsData();
}, []);



const rows = approvedReq.map((req, index) => (
  <RequestOcRender key={index} req={req} user={user} index={index} />
));


  const handleLogOut= async () => {
    try {
      const response = await axios.get('/api/users/logout')
      router.push('/')

      console.log(response)
      
    } catch (error) {
      console.log('Cannot logout', error)
    }
  }




 

  return (
    <div className=" w-full min-h-screen bg-[#f4f6f9] text-black flex flex-col justify-between">
     <div className="">


     <nav className='flex items-center justify-between bg-white px-6 py-4'>
      <div className="flex items-center justify-start gap-6">
        <div className="">
          <FaBars/>
        </div>
        <button>Home</button>
      </div>

      <button onClick={handleLogOut}>

      <FaSignOutAlt/>
      </button>
      
    </nav>


      <div className="px-4">
        <h1 className="text-4xl font-semibold text-center">
          {UserName} | Tank: SIAM | DPS: SIAM | Heal: SIAM | Sup: SIAM | Bomb:
          BOMB_GUEST
        </h1>
        <div className="">
          <Button className="!bg-green-600 !mr-6">Show Hidden Deadth</Button>
          <Button className="!bg-gray-800">Hide Selected</Button>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 mt-6">
        <div className="flex items-center justify-start gap-1">
          <span>Show</span>

          <Select className="!w-24" defaultValue={"10"} data={["10", "20"]} />
          <span>entire</span>
        </div>

        <TextInput
          className="flex justify-start gap-1 items-center"
          label={"Search: "}
          placeholder="Search"
        />
      </div>

      <div className="px-4 mt-4">
     
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
     </div>

      <Footer/>
    </div>
  );
};

export default Mydeaths;
