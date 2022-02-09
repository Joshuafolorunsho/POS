import { calculatePercentage } from "@/utils/calculatePercentage";
import dayjs from "dayjs";
import React, { forwardRef } from "react";
import { CartProps } from ".";

interface ItemProps {
   itemName: string;
   price: string;
   qty: number;
}

interface PrintReceiptProps {
   items: CartProps;
   subTotal: number;
   paidAmount: string;
   paymentMethod: string;
}

const Item: React.FC<ItemProps> = (item) => {
   const { itemName, price, qty } = item;

   return (
      <div className="flex justify-between items-center">
         <span className="w-52 text-left truncate">
            <span>
               {qty.toLocaleString()}.00
               <span className="lowercase"> x</span>
            </span>
            <span className="ml-2">{itemName}</span>
         </span>
         <span className="text-right">{Number(price).toLocaleString()}.00</span>
      </div>
   );
};

const PrintReceipt = ({ items, subTotal, paidAmount, paymentMethod }, ref) => {
   const sumQty = () => items.carts.reduce((a, b) => a + b.qty, 0);

   const total = () => {
      let discount: string = items.discount;
      let fee: string = items.fee;

      if (items.discount.includes("%")) {
         discount = String(calculatePercentage(subTotal, discount));
      }

      if (items.fee.includes("%")) {
         fee = String(calculatePercentage(subTotal, fee));
      }

      return subTotal - Number(discount) + Number(fee);
   };

   return (
      <div className="text-center text-xs mx-auto hidden print:block" ref={ref}>
         <h1 className="text-base font-medium">JOHN DOE SUPERMARKET</h1>
         <p>No. 34, no where street. </p>
         <p>Tel: 081 0000 0000</p>

         <div className="mt-4">
            <div className="flex justify-between items-center">
               <p>Invoice: 199994</p>
               <p>{dayjs().format("DD-MM-YYYY h:MM a")}</p>
            </div>

            <div className="border-b border-black pb-2 border-dashed"></div>

            <div className="mt-2 uppercase">
               {items.carts.map(({ productID, qty, productName, price }) => (
                  <Item key={productID} qty={qty} itemName={productName} price={price} />
               ))}

               <div className="flex space-x-2 justify-between items-center">
                  <span>{sumQty()}.00</span>
                  <div className="border-b border-black border-dashed flex-1"></div>
               </div>
            </div>

            <div className="flex space-x-4 items-center justify-end text-right">
               <div>
                  <p>Subtotal NGN</p>
                  {items.discount && <p>Discount NGN</p>}
                  {items.fee && <p>Added Fee NGN</p>}
                  <p>Total NGN</p>
                  <p className="capitalize">{paymentMethod}</p>
                  <p className="capitalize">Change</p>
               </div>
               <div>
                  <p>{subTotal.toLocaleString()}.00</p>
                  {items.discount && <p>{items.discount.toLocaleString()}.00</p>}
                  {items.fee && <p>{items.fee.toLocaleString()}.00</p>}
                  <p>{total().toLocaleString()}.00</p>
                  <p>{paidAmount.toLocaleString() || 0}.00</p>
                  <p>{String(Number(paidAmount) - total()).toLocaleString()}.00</p>
               </div>
            </div>
            <div className="mt-3 ml-3 mr-3">
               <h6 className="uppercase">Openning Hours</h6>
               <div className="mt-2">
                  <p>Monday - Saturday....8:00AM - 10PM</p>
                  <p>Saturday....12:00PM - 10:00PM</p>
                  <p>Goods bought in good condition are not returnable.</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default React.forwardRef<HTMLDivElement, PrintReceiptProps>(PrintReceipt);
