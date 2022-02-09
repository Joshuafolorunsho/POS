import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import useHandleDropdown from "@/hooks/useHandleDropdown";
import HeaderNotificationCard from "@/components/Common/HeaderNotificationCard";
import HeaderUserCard from "@/components/Common/HeaderUserCard";

interface HeaderProps {
   pageTitle: string;
   description?: string;
   time: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, description = 'Welcome to Buymore', time: IncomingTime = "" }) => {
   const [time, setTime] = useState(IncomingTime);
   const { firstName, lastName, role } = useGetUserInfo();
   const { show, handleSetShow } = useHandleDropdown(2);

   useEffect(() => {
      const interval = setInterval(() => {
         const now = dayjs().format("h:mm a");
         setTime(now);
      }, 1000);
      return () => clearInterval(interval);
   }, []);

   const line = (
      <svg width="2" height="45" viewBox="0 0 2 45" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M1 0V44.5" stroke="url(#paint0_linear_557_2173)" strokeWidth="2" />
         <defs>
            <linearGradient id="paint0_linear_557_2173" x1="1.5" y1="0" x2="1.5" y2="44.5" gradientUnits="userSpaceOnUse">
               <stop stopColor="#D5D6DD" stopOpacity="0" />
               <stop offset="0.510417" stopColor="#F5F6FA" />
               <stop offset="1" stopColor="#F5F6FA" stopOpacity="0" />
            </linearGradient>
         </defs>
      </svg>
   );

   return (
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-7 py-3 text-primary-350 h-16">
         <div className="flex items-center space-x-2">
            <div>
               <h2 className="text-lg font-bold">{pageTitle}</h2>
               <p className="text-sm font-semibold text-primary-450">{description}</p>
            </div>
         </div>

         <div className="flex items-center space-x-3">
            <h5 className="font-semibold">{time}</h5>
            {line}
            <button className="group flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary-100 hover:bg-opacity-25" onClick={() => handleSetShow(0)}>
               <div className="relative">
                  <AiOutlineBell className="text-xl group-hover:text-red-700" />
                  <div className="absolute right-[3px] top-[2px] h-[5px] w-[5px] transform animate-ping rounded-full bg-green-400 opacity-75"></div>
                  <div className="absolute right-[3px] top-[2px] h-1 w-1 transform rounded-full bg-green-500"></div>
               </div>
            </button>
            <HeaderNotificationCard show={show[0]} />
            {line}
            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-100" onClick={() => handleSetShow(1)}>
               <BsPerson className="text-white" />
            </button>
            <button onClick={() => handleSetShow(1)}>
               <h6 className="text-xs font-medium">{role}</h6>
               <div className="flex items-center">
                  <h6 className=" text-sm font-semibold text-primary-850">
                     {firstName} {lastName}
                  </h6>
                  <RiArrowDropDownLine fontSize={25} className={`${show[1]}`} />
               </div>
            </button>
            <HeaderUserCard show={show[1]} />
         </div>
      </header>
   );
};

export default Header;
