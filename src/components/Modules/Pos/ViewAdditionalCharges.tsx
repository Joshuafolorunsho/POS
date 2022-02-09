import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ViewAdditionalChargesProps {
   handleClose: () => void;
   additionalChargesString: string;
   handleUpdateAdditionalFee: (a: string, b: string) => void;
}

interface ButtonActionProps {
   content: string | number;
   handleValue: (a: string | number) => void;
}

const ButtonAction: React.FC<ButtonActionProps> = ({ content,  handleValue }) => {
   const renderContent = () => {
      if (content === "delete") {
         return (
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M13.2504 0.75H6.37294C5.77641 0.750525 5.20449 0.987923 4.78294 1.41L0.717942 5.4675C0.647646 5.53722 0.59185 5.62017 0.553774 5.71157C0.515697 5.80296 0.496094 5.90099 0.496094 6C0.496094 6.09901 0.515697 6.19704 0.553774 6.28843C0.59185 6.37983 0.647646 6.46278 0.717942 6.5325L4.78294 10.59C5.20449 11.0121 5.77641 11.2495 6.37294 11.25H13.2504C13.8472 11.25 14.4195 11.0129 14.8414 10.591C15.2634 10.169 15.5004 9.59674 15.5004 9V3C15.5004 2.40326 15.2634 1.83097 14.8414 1.40901C14.4195 0.987053 13.8472 0.75 13.2504 0.75ZM14.0004 9C14.0004 9.19891 13.9214 9.38968 13.7808 9.53033C13.6401 9.67098 13.4494 9.75 13.2504 9.75H6.37294C6.17437 9.74724 5.98417 9.66955 5.84044 9.5325L2.30794 6L5.84044 2.4675C5.98417 2.33045 6.17437 2.25276 6.37294 2.25H13.2504C13.4494 2.25 13.6401 2.32902 13.7808 2.46967C13.9214 2.61032 14.0004 2.80109 14.0004 3V9ZM11.5329 3.9675C11.4632 3.8972 11.3803 3.84141 11.2889 3.80333C11.1975 3.76526 11.0995 3.74565 11.0004 3.74565C10.9014 3.74565 10.8034 3.76526 10.712 3.80333C10.6206 3.84141 10.5377 3.8972 10.4679 3.9675L9.50044 4.9425L8.53294 3.9675C8.39171 3.82627 8.20017 3.74693 8.00044 3.74693C7.80072 3.74693 7.60917 3.82627 7.46794 3.9675C7.32671 4.10873 7.24737 4.30027 7.24737 4.5C7.24737 4.69973 7.32671 4.89127 7.46794 5.0325L8.44294 6L7.46794 6.9675C7.39765 7.03722 7.34185 7.12017 7.30377 7.21157C7.2657 7.30296 7.24609 7.40099 7.24609 7.5C7.24609 7.59901 7.2657 7.69704 7.30377 7.78843C7.34185 7.87983 7.39765 7.96278 7.46794 8.0325C7.53766 8.1028 7.62062 8.15859 7.71201 8.19667C7.8034 8.23475 7.90143 8.25435 8.00044 8.25435C8.09945 8.25435 8.19748 8.23475 8.28888 8.19667C8.38027 8.15859 8.46322 8.1028 8.53294 8.0325L9.50044 7.0575L10.4679 8.0325C10.5377 8.1028 10.6206 8.15859 10.712 8.19667C10.8034 8.23475 10.9014 8.25435 11.0004 8.25435C11.0995 8.25435 11.1975 8.23475 11.2889 8.19667C11.3803 8.15859 11.4632 8.1028 11.5329 8.0325C11.6032 7.96278 11.659 7.87983 11.6971 7.78843C11.7352 7.69704 11.7548 7.59901 11.7548 7.5C11.7548 7.40099 11.7352 7.30296 11.6971 7.21157C11.659 7.12017 11.6032 7.03722 11.5329 6.9675L10.5579 6L11.5329 5.0325C11.6032 4.96278 11.659 4.87983 11.6971 4.78843C11.7352 4.69704 11.7548 4.59901 11.7548 4.5C11.7548 4.40099 11.7352 4.30296 11.6971 4.21157C11.659 4.12017 11.6032 4.03722 11.5329 3.9675Z"
                  fill="#181B31"
               />
            </svg>
         );
      } else {
         return content;
      }
   };

   return (
      <button onClick={() => handleValue(content)} className="w-8 h-8 flex justify-center items-center border border-purple-50 rounded-lg shadow-sm font-semibold text-primary-100">
         {renderContent()}
      </button>
   );
};

const ViewAdditionalCharges: React.FC<ViewAdditionalChargesProps> = ({ handleClose, additionalChargesString, handleUpdateAdditionalFee }) => {
   const [value, setValue] = useState("");
   const lowerCasedAdditionalChargesString = additionalChargesString.toLowerCase();

   const handleSetValue = (newValue: string | number) => {
      if (newValue === "delete") {
         setValue((prevValue) => prevValue.slice(0, prevValue.length - 1));
      } else {
         setValue((prevValue) => prevValue + newValue);
      }
   };

   const handleAmountBtn = () => {
      handleUpdateAdditionalFee(lowerCasedAdditionalChargesString, value);
      handleClose();
   };

   const handlePercentageBtn = () => {
      if (Number(value) <= 100) {
         handleUpdateAdditionalFee(lowerCasedAdditionalChargesString, `${value}%`);
         handleClose();
      } else {
         toast.error("Percentage must be 100 or less.");
      }
   };

   return (
      <>
         <Toaster position="top-right" />
         <div className="fixed w-full h-full bg-primary-550 bg-opacity-70 inset-0 z-10">
            <div className="relative z-40">
               <div className="fixed bottom-20 right-32 z-40">
                  <div className="w-60 bg-white rounded-lg p-3">
                     <div className="flex justify-between items-center">
                        <h3 className="text-sm text-primary-100 font-semibold">Add {additionalChargesString}</h3>
                        <button onClick={handleClose}>
                           <svg width="9" height="9" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.00391 10L9.68911 1" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M9.68555 10L1.00034 1" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </button>
                     </div>
                     <hr className="my-2" />
                     <div>
                        <h2 className="text-right text-secondary-100 font-bold my-2">{value === "" ? "0" : value}</h2>
                        <div className="grid grid-cols-3 gap-5 justify-items-center w-48 mx-auto my-2">
                           <ButtonAction content={1} handleValue={handleSetValue} />
                           <ButtonAction content={2} handleValue={handleSetValue} />
                           <ButtonAction content={3} handleValue={handleSetValue} />
                           <ButtonAction content={4} handleValue={handleSetValue} />
                           <ButtonAction content={5} handleValue={handleSetValue} />
                           <ButtonAction content={6} handleValue={handleSetValue} />
                           <ButtonAction content={7} handleValue={handleSetValue} />
                           <ButtonAction content={8} handleValue={handleSetValue} />
                           <ButtonAction content={9} handleValue={handleSetValue} />
                           <ButtonAction content="." handleValue={handleSetValue} />
                           <ButtonAction content={0} handleValue={handleSetValue} />
                           <ButtonAction content="delete" handleValue={handleSetValue} />
                        </div>
                     </div>
                     <hr className="my-3" />
                     <div className="flex items-center space-x-2">
                        <button onClick={handleAmountBtn} className="bg-secondary-100 text-white rounded-lg text-xs font-semibold py-2 px-2 w-full">
                           Amount (N)
                        </button>
                        <button onClick={handlePercentageBtn} className="bg-secondary-100 text-white rounded-lg text-xs font-semibold py-2 px-2 w-full">
                           Percent (%)
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ViewAdditionalCharges;
