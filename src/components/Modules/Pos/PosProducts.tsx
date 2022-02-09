import React from "react";
import { AddedCartProps, CartProps } from ".";
import PosProduct from "./PosProduct";
import Image from "next/image";

export interface ProductProps {
   productID: string;
   productName: string;
   productSKU: string;
   productImgUrl: string;
   price: string;
   qtyInStore: number;
}

interface PosProductsProps {
   products: ProductProps[];
   handleAddToCart: (a: AddedCartProps) => void;
}

const PosProducts: React.FC<PosProductsProps> = ({ products, handleAddToCart }) => {
   return products.length > 0 ? (
      <div className="h-[70vh] overflow-y-auto custom-scroll custom-scroll-pos mt-3">
         <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))" }}>
            {products.map((product) => {
               return <PosProduct key={product.productID} product={product} handleAddToCart={handleAddToCart} />;
            })}
         </div>
      </div>
   ) : (
      <div className="flex items-center justify-center h-[70vh]">
         <div className="text-center text-primary-500">
            <Image src={"/assets/img/pos/empty-state.png"} width={350} height={350} alt="self checkout" />
            <h2 className="font-bold text-xl">Store is empty</h2>
            <p className="max-w-xs mx-auto text-sm mt-1">Products available in the store for sale will be displayed here</p>
         </div>
      </div>
   );
};

export default PosProducts;
