import React, { MutableRefObject, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCash, BsCreditCard2Back } from "react-icons/bs";
import { GoCreditCard } from "react-icons/go";
import { BiTransferAlt } from "react-icons/bi";
import PosModal from "./PosModal";
import formatCurrency from "@/utils/formatCurrency";
import { FiDelete } from "react-icons/fi";
import Image from "next/image";
import { CartProps } from ".";
import { formatFigureWithBracketWithNormalPercentage } from "@/utils/formatFigure";
import { calcPercentageOrReturnAmountPlusSign } from "@/utils/calculatePercentage";
import useCalculator from "@/hooks/modules/useCalculator";
import toast, { Toaster } from "react-hot-toast";
import LoaderInline from "@/components/Common/LoaderInline";
import { NewCartProps } from "./PosCart";
import PrintReceipt from "./PrintReceipt";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/router";
import { CreatePurchaseParams } from "@/types";
import Modal from "@/components/Common/Modal";

interface CheckoutPopUpProps {
   showModal: boolean;
   activeCart: number;
   carts: CartProps[];
   closeModal: () => void;
   subTotal: () => number;
   total: () => number;
   value: string;
   paymentMethod: string;
   printReceiptRef: MutableRefObject<any>;
   clearUpValue: () => void;
   handleOpenSuccessModal: () => void;
   handleSetValue: (a: string | number, b?: boolean) => void;
   handlePrint: () => void;
   setPaymentMethod: (a: string) => void;
}

interface ButtonProps {
   value: string | number;
   handleClick: (a: string | number) => void;
}

const Button: React.FC<ButtonProps> = ({ value, handleClick }) => {
   if (value === "delete") {
      return (
         <button onClick={() => handleClick(value)} className="flex flex-1 items-center justify-center rounded-sm bg-gray-950 py-5 font-bold text-primary-500 transition-all duration-200 ease-in-out hover:bg-gray-550">
            <FiDelete />
         </button>
      );
   }
   return (
      <button onClick={() => handleClick(value)} className="flex-1 rounded-sm bg-gray-950 py-5 font-bold text-primary-500 transition-all duration-200 ease-in-out hover:bg-gray-550">
         {value}
      </button>
   );
};

const CheckoutPopUp: React.FC<CheckoutPopUpProps> = ({ showModal, subTotal, total, closeModal, carts, activeCart, clearUpValue, handleOpenSuccessModal, value, handleSetValue, handlePrint, paymentMethod, setPaymentMethod }) => {
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const handlePayment = () => {
      setIsLoading(true);
      const storeID = router.query.id;
      const salesItems = carts[activeCart - 1].carts.map(({ productID, qty, price }) => ({
         productID,
         quantity: qty,
         price,
      }));

      let discount = carts[activeCart - 1].discount;
      let fee = carts[activeCart - 1].fee;
      discount = discount ? discount.substring(0, discount.length - 1) + "~%" : "";
      fee = fee ? fee.substring(0, fee.length - 1) + "~%" : "";

      const payload = {
         cashPaid: value,
         change: total() - Number(value),
         paymentMethod,
         totalPrice: total(),
         storeID,
         discount,
         additionalFee: fee,
         salesItems,
      };

      setTimeout(() => {
         setIsLoading(false);
         toast.success("Payment Successful!");
         handlePrint();
         closeModal();
         handleOpenSuccessModal();
      }, 3000);
   };

   const handleBack = () => {
      clearUpValue();
      closeModal();
   };

   return (
      <>
         <Toaster position="top-right" />
         <PosModal show={showModal}>
            <div className="grid grid-cols-12 print:hidden">
               <div className="col-span-7 p-4">
                  <h3 className="text-md font-bold text-primary-500">Confirm Payment Method</h3>
                  <p className="mt-1 text-sm text-primary-500">Select payment method</p>

                  <div className="mt-2 rounded-md bg-gray-950 p-3">
                     <div className="flex space-x-3">
                        <div className="space-y-2">
                           <button
                              className={`flex  w-44 items-center space-x-3 rounded-md border border-primary p-2 shadow-md hover:bg-secondary-100 hover:text-white ${paymentMethod === "cash" ? "bg-secondary-100 text-white" : "bg-white text-primary-500"}`}
                              onClick={() => setPaymentMethod("cash")}
                           >
                              <BsCash fontSize={26} />

                              <h4 className="text-xs font-bold uppercase">Cash</h4>
                           </button>
                           <button className={`flex  w-44 items-center space-x-3 rounded-md border border-primary p-2 shadow-md hover:bg-secondary-100 hover:text-white ${paymentMethod === "POS" ? "bg-secondary-100 text-white" : "bg-white text-primary-500"}`} onClick={() => setPaymentMethod("POS")}>
                              <BsCreditCard2Back fontSize={26} />

                              <h4 className="text-xs font-bold uppercase">Debit card</h4>
                           </button>
                           <button
                              className={`flex  w-44 items-center space-x-3 rounded-md border border-primary p-2 shadow-md hover:bg-secondary-100 hover:text-white ${paymentMethod === "transfer" ? "bg-secondary-100 text-white" : "bg-white text-primary-500"}`}
                              onClick={() => setPaymentMethod("transfer")}
                           >
                              <BiTransferAlt fontSize={26} />

                              <h4 className="text-xs font-bold uppercase">Transfer</h4>
                           </button>
                           <button
                              className={`flex  w-44 items-center space-x-3 rounded-md border border-primary p-2 shadow-md hover:bg-secondary-100 hover:text-white ${paymentMethod === "gift-card" ? "bg-secondary-100 text-white" : "bg-white text-primary-500"}`}
                              onClick={() => setPaymentMethod("gift-card")}
                           >
                              <GoCreditCard fontSize={26} />

                              <h4 className="text-xs font-bold uppercase">Gift card</h4>
                           </button>
                        </div>
                        {/* Calculator */}
                        <div className="relative flex-1 rounded-md bg-white p-5">
                           <div className="text-right">
                              <span className="font-bold text-primary-500">{formatCurrency(Number(value))}</span>
                           </div>
                           <hr className="my-3" />
                           <div className="flex space-x-3 text-sm">
                              <button className="flex-1 rounded-md bg-secondary-100 py-2 font-semibold text-white" onClick={() => handleSetValue(total(), true)}>
                                 Exact Payment
                              </button>
                              <div className="flex-1 rounded-md bg-[#25B88826] bg-opacity-10 py-2 text-center font-semibold text-green-50">
                                 <span className="text-xs">Change:</span> {value ? formatCurrency(Number(value) - total()) : formatCurrency(0)}
                              </div>
                           </div>

                           <div className="mt-3 space-y-1">
                              <div className="flex space-x-1">
                                 <Button value={1} handleClick={handleSetValue} />
                                 <Button value={2} handleClick={handleSetValue} />
                                 <Button value={3} handleClick={handleSetValue} />
                              </div>
                              <div className="flex space-x-1">
                                 <Button value={4} handleClick={handleSetValue} />
                                 <Button value={5} handleClick={handleSetValue} />
                                 <Button value={6} handleClick={handleSetValue} />
                              </div>
                              <div className="flex space-x-1">
                                 <Button value={7} handleClick={handleSetValue} />
                                 <Button value={8} handleClick={handleSetValue} />
                                 <Button value={9} handleClick={handleSetValue} />
                              </div>
                              <div className="flex space-x-1">
                                 <Button value="00" handleClick={handleSetValue} />
                                 <Button value={0} handleClick={handleSetValue} />
                                 <Button value="delete" handleClick={handleSetValue} />
                              </div>
                           </div>

                           {/* Disable calcuator if other payment method apart from 'cash' is selected */}
                           {/* {paymentMethod !== "cash" && <div className="absolute inset-0 z-10 bg-red-500 bg-opacity-10"></div>} */}
                        </div>
                     </div>
                  </div>
                  <hr className="my-3" />
                  <div className="mx-4 mt-6 flex justify-end space-x-2 text-xs">
                     <button onClick={handleBack} className="rounded-md border border-primary bg-white py-2 px-8 font-bold text-primary-500">
                        Back to Sale
                     </button>
                     <button disabled={isLoading || value.length === 0} className={`flex items-center justify-center space-x-2 rounded-md bg-secondary-100 py-2 px-8 font-bold text-white ${isLoading || value.length === 0 ? "bg-opacity-60" : ""}`} onClick={handlePayment}>
                        {isLoading && <LoaderInline />} <span>Confirm Payment</span>
                     </button>
                  </div>
               </div>
               <div className="col-span-5 border-l border-primary p-4">
                  <div className="flex justify-between">
                     <h3 className="text-md font-bold text-primary-500">Cart</h3>
                     <button onClick={() => closeModal()}>
                        <AiOutlineClose fontSize={16} />
                     </button>
                  </div>
                  <div className="custom-scroll custom-scroll-pos mt-3 h-[60vh] overflow-y-auto">
                     {carts[activeCart - 1].carts.map(({ productName, productID, productImgUrl, qty, price }) => {
                        return (
                           <div key={productID} className="mr-3">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-2">
                                    <Image className="rounded-md" src={productImgUrl} width={50} height={50} alt={productName} />
                                    <div>
                                       <h5 className="w-80 truncate text-sm font-semibold text-primary-500">{productName}</h5>
                                       <p className="mt-1 text-xs">
                                          <span>
                                             {qty} x {formatCurrency(Number(price))}
                                          </span>
                                       </p>
                                    </div>
                                 </div>
                                 <span className="text-sm font-bold text-primary-500">{formatCurrency(Number(price) * Number(qty))}</span>
                              </div>
                              <hr className="mt-2" />
                           </div>
                        );
                     })}
                  </div>
                  <div className=" bg-white">
                     <div className="my-2 border-b-2 border-dashed"></div>
                     <div className="space-y-1">
                        <div className="flex justify-between text-primary-500">
                           <h5 className="text-sm font-semibold">Subtotal</h5>
                           <p className="text-sm font-semibold">{formatCurrency(subTotal())}</p>
                        </div>
                        <div className="flex justify-between text-primary-500">
                           <div className="flex items-center space-x-1">
                              <h5 className="text-sm font-semibold  text-primary-850">Discount</h5>
                              <p className="text-xs font-semibold text-primary-850">{formatFigureWithBracketWithNormalPercentage(carts[activeCart - 1].discount)}</p>
                           </div>
                           <p className="text-sm font-semibold">{calcPercentageOrReturnAmountPlusSign(subTotal(), carts[activeCart - 1].discount)}</p>
                        </div>
                        <div className="flex justify-between text-primary-500">
                           <div className="flex items-center space-x-1">
                              <h5 className="text-sm font-semibold  text-primary-850">Additional Fee</h5>
                              <p className="text-xs font-semibold text-primary-850">{formatFigureWithBracketWithNormalPercentage(carts[activeCart - 1].fee)}</p>
                           </div>
                           <p className="text-sm font-semibold">{calcPercentageOrReturnAmountPlusSign(subTotal(), carts[activeCart - 1].fee, "+")}</p>
                        </div>
                     </div>
                     <div className="my-2 border-b-2 border-dashed"></div>

                     <div className="mb-2">
                        <div className="flex items-center justify-between text-primary-500">
                           <h5 className="text-base font-semibold">Total</h5>
                           <p className="text-lg font-bold text-secondary-100">{formatCurrency(total())}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </PosModal>
      </>
   );
};

export default CheckoutPopUp;
