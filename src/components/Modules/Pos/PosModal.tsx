import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PosModalProps {
   show: boolean;
   children: JSX.Element | JSX.Element[];
}

const PosModal: React.FC<PosModalProps> = ({ show, children }) => {
   const [isBrowser, setIsBrowser] = useState(false);

   useEffect(() => {
      setIsBrowser(true);
   }, []);

   const modalContent = show ? (
      <div className="fixed z-50 inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
         <div className={`bg-white relative z-50 w-[85%] mt-7 rounded-lg sm:mx-auto ${show ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}`}>{children}</div>
      </div>
   ) : null;

   if (isBrowser) {
      return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
   } else {
      return null;
   }
};

export default PosModal;
