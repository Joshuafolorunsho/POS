import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { CartProps } from ".";
import { NewCartProps } from "./PosCart";

interface CartButtonProps {
   cart: NewCartProps;
   activeCart: number;
   setActiveCart: React.Dispatch<React.SetStateAction<number>>;
   setCarts: React.Dispatch<React.SetStateAction<CartProps[]>>;
   setNewCartsPanel: React.Dispatch<React.SetStateAction<NewCartProps[]>>;
   handleRemoveCartPanel: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ cart, activeCart, setActiveCart, setCarts, handleRemoveCartPanel, setNewCartsPanel }) => {
   const { cartID, cartName } = cart;
   const active = cartID === activeCart;

   const handleDelete = () => {
      // Avoid deleting if you are not on the cart.
      if (!active) {
         toast.error("You can't remove a cart you are not currently on.");
         return;
      }

      // remove from cart
      setCarts((prevCarts) => {
         return prevCarts.filter((prevCart) => prevCart.cartID !== activeCart);
      });

      setActiveCart((prevActiveCart) => prevActiveCart - 1);

      // delete panel
      handleRemoveCartPanel();
   };

   const handleActiveState = () => {
      setActiveCart(cartID);
   };

   return (
      <div className={`flex space-x-2 items-center px-2 py-1 rounded-xl font-semibold cursor-pointer ${active ? "bg-secondary-100 text-white" : "bg-primary-500 text-primary-350"}`}>
         <button onClick={handleActiveState}>
            <span className="capitalize">{cartName}</span>
         </button>
         <button onClick={handleDelete} className={`${cartID === 1 && "hidden"}`}>
            <AiOutlineClose fontSize={10} className={`font-bold ${active ? "#D69CA3" : "#C6CDDC"}`} />
         </button>
      </div>
   );
};

export default CartButton;
