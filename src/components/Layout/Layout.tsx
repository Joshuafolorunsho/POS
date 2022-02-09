import { SIDEBAR_WIDTH } from "@/utils/CONSTANTS";
import React, { useState } from "react";
import DashboardFooter from "./DashboardFooter";
import Sidebar from "./Sidebar";

interface LayoutProps {
   children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
   const [isExpand, setIsExpand] = useState(true);

   const handleCollapseBar = () => {
      setIsExpand((prevIsExpand) => !prevIsExpand);
   };
   return (
      <>
         <Sidebar isExpand={isExpand} handleClick={handleCollapseBar} />
         <div style={{ marginLeft: SIDEBAR_WIDTH }} className="h-screen bg-gray-25 transition-all duration-300">
            {children}
            <DashboardFooter />
         </div>
      </>
   );
};

export default Layout;
