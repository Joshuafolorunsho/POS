import formatCurrency from "@/utils/formatCurrency";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import Image from 'next/image';

export interface CartSectionProps {
   productID: string;
   productName: string;
   productImgUrl: string;
   price: string;
   qty: number;
   handleRemoveFromCart: (a: string) => void;
   handleQtyIncrement: (a: string) => void;
   handleQtyDecrement: (a: string) => void;
}

const Cart: React.FC<CartSectionProps> = ({ productID, productName, productImgUrl, qty, price, handleRemoveFromCart, handleQtyIncrement, handleQtyDecrement }) => {
   return (
      <div className="flex space-x-3 justify-between items-center border-b border-secondary-100 pb-2">
         <div className="flex space-x-3 items-center">
            <Image className="object-cover rounded-md" src={productImgUrl} width="50" height="50" alt={productName} />
            <div className="text-sm">
               <p className="font-semibold text-primary-500 truncate w-44">{productName}</p>
               <p className="font-semibold text-secondary-100">{formatCurrency(Number(price))}</p>
            </div>
         </div>
         <div className="flex space-x-2 items-center">
            <button className="flex items-center justify-center bg-primary-500 rounded-md p-1" disabled={qty === 1} onClick={() => handleQtyDecrement && handleQtyDecrement(productID)}>
               <IoMdRemove className="text-primary-350" fontSize={12} />
            </button>
            <span className="font-bold text-primary-350 text-sm">{qty}</span>
            <button className="flex items-center justify-center bg-primary-500 rounded-md p-1" onClick={() => handleQtyIncrement && handleQtyIncrement(productID)}>
               <IoMdAdd className="text-primary-350" fontSize={12} />
            </button>
            <button onClick={() => handleRemoveFromCart && handleRemoveFromCart(productID)}>
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM6.707 5.293C6.5184 5.11084 6.2658 5.01005 6.0036 5.01233C5.7414 5.0146 5.49059 5.11977 5.30518 5.30518C5.11977 5.49059 5.0146 5.7414 5.01233 6.0036C5.01005 6.2658 5.11084 6.5184 5.293 6.707L6.586 8L5.293 9.293C5.19749 9.38525 5.12131 9.49559 5.0689 9.6176C5.01649 9.7396 4.9889 9.87082 4.98775 10.0036C4.9866 10.1364 5.0119 10.2681 5.06218 10.391C5.11246 10.5139 5.18671 10.6255 5.2806 10.7194C5.3745 10.8133 5.48615 10.8875 5.60905 10.9378C5.73194 10.9881 5.86362 11.0134 5.9964 11.0123C6.12918 11.0111 6.2604 10.9835 6.3824 10.9311C6.50441 10.8787 6.61475 10.8025 6.707 10.707L8 9.414L9.293 10.707C9.4816 10.8892 9.7342 10.99 9.9964 10.9877C10.2586 10.9854 10.5094 10.8802 10.6948 10.6948C10.8802 10.5094 10.9854 10.2586 10.9877 9.9964C10.99 9.7342 10.8892 9.4816 10.707 9.293L9.414 8L10.707 6.707C10.8892 6.5184 10.99 6.2658 10.9877 6.0036C10.9854 5.7414 10.8802 5.49059 10.6948 5.30518C10.5094 5.11977 10.2586 5.0146 9.9964 5.01233C9.7342 5.01005 9.4816 5.11084 9.293 5.293L8 6.586L6.707 5.293Z"
                     fill="#F1383E"
                  />
               </svg>
            </button>
         </div>
      </div>
   );
};

export default Cart;
