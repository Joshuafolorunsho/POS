import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { GrFormClose } from "react-icons/gr";
import React, { useRef, useState } from "react";
import { formatFigureWithBracketWithNormalPercentage } from "@/utils/formatFigure";
import { calcPercentageOrReturnAmountPlusSign, calculatePercentage } from "@/utils/calculatePercentage";
import ViewAdditionalCharges from "./ViewAdditionalCharges";
import { FiChevronRight, FiPrinter } from "react-icons/fi";
import formatCurrency from "@/utils/formatCurrency";
import CartButton from "./CartButton";
import usePosCart from "@/hooks/modules/pos/usePosCart";
import Cart, { CartSectionProps } from "./Cart";
import Image from "next/image";
import { CartProps } from ".";
import CheckoutPopUp from "./CheckoutPopUp";
import useModal from "@/hooks/useModal";
import Modal from "@/components/Common/Modal";
import ModalSuccess from "@/components/Common/ModalSuccess";
import { useReactToPrint } from "react-to-print";
import PrintReceipt from "./PrintReceipt";
import useCalculator from "@/hooks/modules/useCalculator";

export interface NewCartProps {
   cartID: number;
   cartName: string;
}

interface PosCartProps {
   newCartsPanel: NewCartProps[];
   setNewCartsPanel: any;
   activeCart: number;
   setActiveCart: React.Dispatch<React.SetStateAction<number>>;
   setCarts: React.Dispatch<React.SetStateAction<CartProps[]>>;
   handleAddNewCartPanel: () => void;
   carts: CartProps[];
   handleRemoveFromCart: (a: string) => void;
   handleQtyIncrement: (a: string) => void;
   handleQtyDecrement: (a: string) => void;
   handleClearCart: () => void;
   handleRemoveCartPanel: () => void;
   handleDeleteCharges: (a: string) => void;
   handleUpdateAdditionalFee: (a: string, b: string) => void;
}

const PosCart: React.FC<PosCartProps> = ({ carts, handleUpdateAdditionalFee, setCarts, handleDeleteCharges, handleRemoveFromCart, newCartsPanel, setNewCartsPanel, activeCart, setActiveCart, handleAddNewCartPanel, handleRemoveCartPanel, handleQtyIncrement, handleQtyDecrement, handleClearCart }) => {
   const { additionalCharges, additionalChargesString, handleShow, handleClose } = usePosCart();
   const [isSuccessModal, setIsSuccessModal] = useState(false);
   const [paymentMethod, setPaymentMethod] = useState("cash");
   const { showModal, openModal, closeModal } = useModal();
   const { value, handleSetValue } = useCalculator();
   const printReceiptRef = useRef(null);

   const subTotal = () => {
      return carts[activeCart - 1].carts.reduce((accumulator, cart) => {
         return accumulator + cart.qty * Number(cart.price);
      }, 0);
   };

   const total = () => {
      let discount: number | string = carts[activeCart - 1].discount;
      let fee: number | string = carts[activeCart - 1].fee;

      if (carts[activeCart - 1].discount.includes("%")) {
         discount = calculatePercentage(subTotal(), discount);
      }

      if (carts[activeCart - 1].fee.includes("%")) {
         fee = calculatePercentage(subTotal(), fee);
      }

      return subTotal() - Number(discount) + Number(fee);
   };

   // Handle adding of new panel
   const handleClick = () => {
      handleAddNewCartPanel();
      setCarts((prevCarts) => {
         return [
            ...prevCarts,
            {
               cartID: prevCarts.length + 1,
               carts: [],
               discount: "",
               fee: "",
            },
         ];
      });
   };

   const handleOpenSuccessModal = () => {
      setIsSuccessModal(true);
   };

   const clearUpValue = () => {
      // Clear value in calculator
      handleSetValue("", true);
   };

   const handleCloseSuccessModal = () => {
      clearUpValue();
      // clear current cart
      handleClearCart();
      // if there is more than 1 cart active
      if (newCartsPanel.length !== 1) {
         // remove cart tab panel
         handleRemoveCartPanel();
         // select active tab
         setActiveCart(1);
      }

      setIsSuccessModal(false);
   };

   const handlePrint = useReactToPrint({
      content: () => printReceiptRef.current,
   });

   return (
      <>
         <div className="relative h-[80vh]">
            <div className="flex justify-between items-center">
               <div className="flex items-center space-x-2 text-xs my-3">
                  {newCartsPanel.map((cart) => {
                     return <CartButton key={cart.cartID} cart={cart} activeCart={activeCart} setActiveCart={setActiveCart} setCarts={setCarts} setNewCartsPanel={setNewCartsPanel} handleRemoveCartPanel={handleRemoveCartPanel} />;
                  })}
                  <div className={`${newCartsPanel.length === 3 && "hidden"}`}>
                     <button className="flex items-center justify-center bg-primary-500 rounded-full p-1" onClick={handleClick}>
                        <IoMdAdd className="text-primary-350" />
                     </button>
                  </div>
               </div>
               <button className="font-semibold text-secondary-100 text-sm" onClick={handleClearCart}>
                  Clear cart
               </button>
            </div>

            {carts[activeCart - 1].carts.length === 0 ? (
               <div className="flex justify-center items-center text-primary-500 h-[60vh]">
                  <div className="text-center">
                     <Image src="/assets/img/basket.png" width="100" height="83" alt="basket" />
                     <h4 className="text-sm font-bold uppercase my-1">Empty Cart</h4>
                     <p className="text-xs max-w-[200px]">The list of your customer’s items will appear on this cart</p>
                  </div>
               </div>
            ) : (
               <>
                  {/* product in cart */}
                  <div className="h-[45vh] overflow-y-auto custom-scroll custom-scroll-pos space-y-2">
                     {carts[activeCart - 1].carts.map(({ productID, productImgUrl, productName, qty, price }) => {
                        return <Cart key={productID} productID={productID} productImgUrl={productImgUrl} productName={productName} qty={qty} price={price} handleRemoveFromCart={handleRemoveFromCart} handleQtyIncrement={handleQtyIncrement} handleQtyDecrement={handleQtyDecrement} />;
                     })}
                  </div>

                  {/* bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white">
                     <div className="border-b-2 border-dashed my-2"></div>
                     <div className="space-y-1">
                        <div className="flex justify-between text-primary-500">
                           <h5 className="font-semibold text-sm">Subtotal</h5>
                           <p className="font-semibold text-sm">{formatCurrency(subTotal())}</p>
                        </div>
                        <div className="flex justify-between text-primary-500">
                           <div className="flex items-center space-x-1">
                              <h5 className="font-semibold text-sm  text-primary-850">Discount</h5>
                              <p className="font-semibold text-xs text-primary-850">{formatFigureWithBracketWithNormalPercentage(carts[activeCart - 1].discount)}</p>
                           </div>
                           <div className="flex items-center">
                              <p className="font-semibold text-sm">{calcPercentageOrReturnAmountPlusSign(subTotal(), carts[activeCart - 1].discount)}</p>
                              {carts[activeCart - 1].discount !== "" && (
                                 <button className="ml-2" onClick={() => handleDeleteCharges("discount")}>
                                    <AiOutlineDelete fontSize={13} color="red" />
                                 </button>
                              )}
                           </div>
                        </div>
                        <div className="flex justify-between text-primary-500">
                           <div className="flex items-center space-x-1">
                              <h5 className="font-semibold text-sm  text-primary-850">Additional Fee</h5>
                              <p className="font-semibold text-xs text-primary-850">{formatFigureWithBracketWithNormalPercentage(carts[activeCart - 1].fee)}</p>
                           </div>
                           <div className="flex items-center">
                              <p className="font-semibold text-sm">{calcPercentageOrReturnAmountPlusSign(subTotal(), carts[activeCart - 1].fee, "+")}</p>
                              {carts[activeCart - 1].fee !== "" && (
                                 <button className="ml-2" onClick={() => handleDeleteCharges("fee")}>
                                    <AiOutlineDelete fontSize={13} color="red" />
                                 </button>
                              )}
                           </div>
                        </div>
                     </div>
                     <div className="border-b-2 border-dashed my-2"></div>
                     <div className="flex space-x-2 mb-2">
                        <button className="text-xxs font-bold p-1 text-primary-350 bg-primary-500 rounded-md" onClick={() => handleShow("Discount")}>
                           Add Discount
                        </button>
                        <button className="text-xxs font-bold p-1 text-primary-350 bg-primary-500 rounded-md" onClick={() => handleShow("Fee")}>
                           Add Fee
                        </button>
                     </div>

                     {/* <div className="mb-2">
                        <div className="flex justify-between text-primary-500">
                           <h5 className="font-semibold text-base">Total</h5>
                           <p className="font-semibold text-base">{formatCurrency(total())}</p>
                        </div>
                     </div> */}

                     <button type="button" onClick={openModal} className="bg-secondary-100 w-full text-white text-sm space-x-2 font-semibold py-2 rounded-md mb-2">
                        {false ? (
                           <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: "auto", display: "block", shapeRendering: "auto" }} width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                              <circle cx="50" cy="50" fill="none" stroke="#fff" strokeWidth="9" r="28" strokeDasharray="131.94689145077132 45.982297150257104">
                                 <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                              </circle>
                           </svg>
                        ) : (
                           <div className="flex justify-between px-3">
                              <span>Checkout</span>

                              <div className="flex space-x-2 items-center">
                                 <span className="text-xs font-medium">{formatCurrency(total())}</span>
                                 <FiChevronRight />
                              </div>
                           </div>
                        )}
                     </button>
                  </div>
               </>
            )}
         </div>

         <CheckoutPopUp
            closeModal={closeModal}
            showModal={showModal}
            carts={carts}
            activeCart={activeCart}
            subTotal={subTotal}
            total={total}
            printReceiptRef={printReceiptRef}
            handlePrint={handlePrint}
            value={value}
            clearUpValue={clearUpValue}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            handleSetValue={handleSetValue}
            handleOpenSuccessModal={handleOpenSuccessModal}
         />
         <PrintReceipt ref={printReceiptRef} items={carts[activeCart - 1]} subTotal={subTotal()} paidAmount={value} paymentMethod={paymentMethod} />
         {additionalCharges && <ViewAdditionalCharges handleClose={handleClose} additionalChargesString={additionalChargesString} handleUpdateAdditionalFee={handleUpdateAdditionalFee} />}
         <ModalSuccess show={isSuccessModal}>
            <div className="flex justify-center text-center">
               <div>
                  <img src={"/assets/img/checkmark.gif"} alt="checkmark" />
                  <div className="-mt-8">
                     <h1 className="font-bold text-2xl">Sales Completed</h1>
                     <div className="flex justify-center space-x-3 mt-4 mb-5">
                        <button className="text-sm rounded-md px-3 py-2 text-white bg-secondary-100 flex items-center space-x-2" onClick={() => handlePrint()}>
                           <span>Reprint receipt</span>
                           <FiPrinter />
                        </button>
                        <button className="text-sm rounded-md px-3 py-2 text-white bg-black flex items-center space-x-2" onClick={handleCloseSuccessModal}>
                           <span>Close</span>
                           <AiOutlineClose />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </ModalSuccess>
      </>
   );
};

export default PosCart;
