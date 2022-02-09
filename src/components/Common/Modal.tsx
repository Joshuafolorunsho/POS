import { isServer } from "@/utils/isServer";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
   show: boolean;
   onClose: () => void;
   title?: string;
   description?: string;
   children: JSX.Element | JSX.Element[];
   classNames?: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title, classNames = "max-w-lg mt-11 xl:mt-24", description, children }) => {
   const [isBrowser, setIsBrowser] = useState(false);

   useEffect(() => {
      setIsBrowser(true);
   }, []);

   const handleCloseModal = () => {
      onClose();
   };


   const modalContent = show ? (
      <div className="fixed inset-0 z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
         <div className={`relative z-50 bg-white ${classNames} m-4 rounded-lg p-4 sm:mx-auto ${show ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}`}>
            <div className="flex items-center justify-between">
               <div>
                  <h3 className="text-xl font-semibold  text-primary-500">{title}</h3>
                  <p className="text-md  text-primary-350">{description}</p>
               </div>
               <button onClick={handleCloseModal}>
                  <AiOutlineClose fontSize={16} />
               </button>
            </div>
            <hr className="my-2 xl:my-4" />
            {children}
         </div>
      </div>
   ) : null;
   const  modalRoot = document.getElementById("modal-root");

   if (isBrowser && modalRoot) {
      return ReactDOM.createPortal(modalContent, modalRoot);
   } else {
      return null;
   }
};


export default Modal;
