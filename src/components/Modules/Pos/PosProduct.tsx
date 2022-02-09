import Image from "next/image";
import React from "react";
import { AddedCartProps } from ".";

interface PosProductProps {
   product: {
      productName: string;
      productID: string;
      productImgUrl: string;
      price: string;
      qtyInStore: number;
   };
   handleAddToCart: (a: AddedCartProps) => void;
}

const PosProduct: React.FC<PosProductProps> = ({ product, handleAddToCart }) => {
   const { productID, productName, price, productImgUrl, qtyInStore } = product;

   const handleClick = () => {
      const cart = {
         productID,
         productName,
         productImgUrl,
         price,
         qty: 1,
         qtyInStore
      };
      handleAddToCart(cart);
   };

   return (
      <div className="h-48 border border-primary rounded-lg relative overflow-hidden cursor-pointer group">
         <div className="relative h-44">
            <Image src={productImgUrl} layout="fill" alt={productName} objectFit="cover" />
            {qtyInStore > 0 ? (
               <button onClick={handleClick} className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100 inset-0 flex justify-center  w-full items-center bg-gray-850 bg-opacity-70">
                  <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M30.5 20.2461V40.7006" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M40.7371 30.4717H20.2631" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                     <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M43.581 2.58301H17.4191C8.29964 2.58301 2.58337 9.03758 2.58337 18.1749V42.8244C2.58337 51.9618 8.27306 58.4163 17.4191 58.4163H43.581C52.727 58.4163 58.4167 51.9618 58.4167 42.8244V18.1749C58.4167 9.03758 52.727 2.58301 43.581 2.58301Z"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </button>
            ) : (
               <button className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100 inset-0 flex justify-center  w-full items-center bg-gray-400 bg-opacity-70 cursor-not-allowed">
                  <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M30.5 20.2461V40.7006" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M40.7371 30.4717H20.2631" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                     <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M43.581 2.58301H17.4191C8.29964 2.58301 2.58337 9.03758 2.58337 18.1749V42.8244C2.58337 51.9618 8.27306 58.4163 17.4191 58.4163H43.581C52.727 58.4163 58.4167 51.9618 58.4167 42.8244V18.1749C58.4167 9.03758 52.727 2.58301 43.581 2.58301Z"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </button>
            )}
         </div>
         <p className="bg-maroon-100 capitalize truncate absolute bottom-0 w-full text-center text-white text-sm py-1 px-2">{productName}</p>
      </div>
   );
};

export default PosProduct;
