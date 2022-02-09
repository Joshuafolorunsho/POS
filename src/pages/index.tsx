import type { GetServerSidePropsContext, NextPage } from "next";
import PosHeader from "@/components/Modules/Pos/Header";
import PosSection from "@/components/Modules/Pos";
import Head from "next/head";
import { useEffect, useState } from "react";
import { detectMobile } from "@/utils/detectMobile";

const POS: NextPage = () => {
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      if (detectMobile() && document.documentElement.clientWidth <= 768) {
         setIsMobile(true);
      }
   }, []);

   return (
      <>
         <Head>
            <title>Buymore App</title>
            <meta name="description" content="Buymore App" />
         </Head>

         {isMobile ? (
            <div className="flex h-screen items-center justify-center">
               <div className="text-center text-primary-500">
                  <p className="text-xl">App only renders well on bigger screens.</p>
                  <h1 className="text-3xl font-bold mt-2">Please check on PC</h1>
               </div>
            </div>
         ) : (
            <>
               <PosHeader />
               <PosSection />
            </>
         )}
      </>
   );
};

export default POS;
