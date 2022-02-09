import { AiOutlineBell } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import dayjs from "dayjs";
import React from "react";

const PosHeader = () => {

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
      <header className="sticky top-0 z-50 h-[10vh] border-b bg-white px-4">
         <div className="container mx-auto flex h-[10vh] items-center justify-between py-3 text-primary-350">
            <div className="flex items-center space-x-4">
               <div>
                  <h2 className="text-sm font-semibold text-primary-450">Welcome to POS</h2>
                  <p className="text-xs font-semibold">Point of sales</p>
               </div>
            </div>

            <div className="flex items-center space-x-3">
               <h5 className="font-semibold">{dayjs().format("hh:MM A")}</h5>
               {line}
               <button>
                  <AiOutlineBell className="text-xl" />
               </button>
               {line}
               <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-100">
                  <BsPerson className="text-white" />
               </div>
               <div>
                  <h6 className="text-sm font-semibold text-primary-850">Joe Doe</h6>
                  <h6 className="text-xs font-semibold">Sales Rep.</h6>
               </div>
            </div>
         </div>
      </header>
   );
};

export default PosHeader;