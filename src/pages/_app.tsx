import "@/assets/styles/third-party/slick/slick-theme.css";
import "@/assets/styles/third-party/slick/slick.min.css";
import "@/assets/styles/globals.css";
import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import { detectMobile } from "@/utils/detectMobile";

const MyApp = ({ Component, pageProps }) => {
   const [isMobile, setIsMobile] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setIsLoading(false);
      if (detectMobile() && document.documentElement.clientWidth <= 768) {
         setIsMobile(true);
      }
   }, []);

   if (isLoading) {
      return (
         <div className="flex h-screen items-center justify-center">
            <div className="text-center text-primary-500">
               <p className="text-xl">Loading.....</p>
            </div>
         </div>
      );
   }

   if (isMobile) {
      return (
         <div className="flex h-screen items-center justify-center">
            <div className="text-center text-primary-500">
               <p className="text-xl">App only renders well on bigger screens.</p>
               <h1 className="mt-2 text-3xl font-bold">Please check on PC</h1>
            </div>
         </div>
      );
   }

   return <Component {...pageProps} />;
};

export default MyApp;
