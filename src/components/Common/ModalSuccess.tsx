import { isServer } from "@/utils/isServer";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

interface ModalSuccessProps {
   show: boolean;
   children: JSX.Element | JSX.Element[];
   classNames?: string;
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({ show, classNames = "max-w-lg mt-11 xl:mt-24", children }) => {
   const [isBrowser, setIsBrowser] = useState(false);

   useEffect(() => {
      setIsBrowser(true);
   }, []);

   const modalContent = show ? (
      <div className="fixed inset-0 z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
         <div className={`relative z-50 bg-white ${classNames} m-4 rounded-lg p-4 sm:mx-auto ${show ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}`}>{children}</div>
      </div>
   ) : null;


   if (isBrowser) {
      const  modalRoot = document.getElementById("modal-root");
      return ReactDOM.createPortal(modalContent, modalRoot);
   } else {
      return null;
   }
};

export default ModalSuccess;
