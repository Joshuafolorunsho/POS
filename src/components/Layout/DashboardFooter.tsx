import { FOOTER_HEIGHT, SIDEBAR_WIDTH } from "@/utils/CONSTANTS";
import React from "react";

const DashboardFooter = () => {
   return (
      <footer className="fixed bottom-0 right-0 flex items-center  justify-center border-t border-t-secondary-100 bg-white text-center" style={{ left: SIDEBAR_WIDTH, height: FOOTER_HEIGHT }}>
         <p className="py-3 text-xsm text-gray-250">© 2021 Buymore. All Rights Reserved.</p>
      </footer>
   );
};

export default DashboardFooter;
