import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import useFilterBySearch from "@/hooks/useFilterBySearch";
import PosProducts, { ProductProps } from "./PosProducts";
import data from "@/mockData/products";
import { useRouter } from "next/router";
import PosTopBar from "./PosTopBar";
import PosCart from "./PosCart";


export interface AddedCartProps {
   productID: string;
   productName: string;
   productImgUrl: string;
   price: string;
   qty: number;
   qtyInStore: number;
}

export interface CartProps {
   cartID: number;
   carts: AddedCartProps[];
   discount: string;
   fee: string;
}

const PosSection = () => {
   const { searchTerm, handleSearchChange } = useFilterBySearch();
   const [products, setProducts] = useState(data);
   const [carts, setCarts] = useState<CartProps[]>([
      {
         cartID: 1,
         carts: [],
         discount: "",
         fee: "",
      },
   ]);
   const [activeCart, setActiveCart] = useState(1);
   const [scanData, setScanData] = useState("");
   const [reading, setReading] = useState(false);
   const router = useRouter();


   const [newCartsPanel, setNewCartsPanel] = useState([
      {
         cartID: 1,
         cartName: "cart one",
      },
   ]);

   // Scan logic
   useEffect(() => {
      const body = document.body;

      const handleScanner = (e) => {
         if (e.key === "Enter") {
            setScanData((prevScanData) => {
               const product = products.find((product) => {
                  return product.productSKU === prevScanData;
               });

               if (product) {
                  const { productID, productImgUrl, productName, productSKU, price, qtyInStore } = product;
                  const newCart = {
                     productID,
                     productName,
                     productImgUrl,
                     productSKU,
                     price,
                     qtyInStore,
                     qty: 1,
                  };

                  handleAddToCart(newCart);
               }

               return prevScanData;
            });
         } else {
            setScanData((prevScanData) => prevScanData + e.key);
         }
      };

      body.addEventListener("keydown", handleScanner);

      const timeOut = setTimeout(() => {
         setScanData("");
         setReading(false);
      }, 500);

      //run a timeout of 500ms at the first read and clear everything
      if (!reading) {
         timeOut;
      }

      return () => {
         body.removeEventListener("keydown", handleScanner);
         clearTimeout(timeOut);
      };
   }, [scanData, reading]); // eslint-disable-line react-hooks/exhaustive-deps

   const handleAddNewCartPanel = () => {
      setNewCartsPanel((prevCartsPanel) => {
         const newCartID = prevCartsPanel[prevCartsPanel.length - 1].cartID + 1;

         const numberInLetter = newCartID === 2 ? "two" : "three";

         const newCart = {
            cartID: newCartID,
            cartName: "cart " + numberInLetter,
         };
         return [...prevCartsPanel, newCart];
      });

      setActiveCart(newCartsPanel[newCartsPanel.length - 1].cartID + 1);
   };

   const handleRemoveCartPanel = () => {
      setNewCartsPanel((prevCartsPanel) => {
         return prevCartsPanel.filter((prevCartPanel) => prevCartPanel.cartID !== activeCart);
      });
   };

   const filterByNameAndSKU = (products: ProductProps[]) => {
      return products.filter((product) => {
         if (searchTerm === "") {
            return product;
         } else if (product.productName.toLowerCase().includes(searchTerm.toLowerCase()) || product.productSKU.toLowerCase().includes(searchTerm.toLowerCase())) {
            return product;
         }
      });
   };

   const handleAddToCart = (newCart: AddedCartProps) => {
      setCarts((prevCarts) => {
         return prevCarts.map((prevCart) => {
            if (prevCart.cartID === activeCart) {
               const isInCart = prevCart.carts.find(({ productID }) => productID === newCart.productID);

               if (isInCart) {
                  return {
                     ...prevCart,
                     carts: prevCart.carts.map((cart) => {
                        if (cart.productID === isInCart.productID) {
                           return {
                              ...cart,
                              qty: cart.qty + 1 <= cart.qtyInStore ? cart.qty + 1 : cart.qty, // don't add more than what is in store
                           };
                        }
                        return cart;
                     }),
                  };
               }

               return {
                  ...prevCart,
                  carts: [newCart, ...prevCart.carts ],
               };
            }
            return prevCart;
         });
      });
   };

   const handleQtyIncrement = (productID: string) => {
      setCarts((prevCarts) => {
         return prevCarts.map((prevCart) => {
            if (prevCart.cartID === activeCart) {
               return {
                  ...prevCart,
                  carts: prevCart.carts.map((cart) => {
                     if (cart.productID === productID) {
                        return {
                           ...cart,
                           qty: cart.qty + 1,
                        };
                     }
                     return cart;
                  }),
               };
            }
            return prevCart;
         });
      });
   };

   const handleQtyDecrement = (productID: string) => {
      setCarts((prevCarts) => {
         return prevCarts.map((prevCart) => {
            if (prevCart.cartID === activeCart) {
               return {
                  ...prevCart,
                  carts: prevCart.carts.map((cart) => {
                     if (cart.productID === productID) {
                        return {
                           ...cart,
                           qty: cart.qty - 1,
                        };
                     }
                     return cart;
                  }),
               };
            }
            return prevCart;
         });
      });
   };

   const handleRemoveFromCart = (productID: string) => {
      setCarts((prevCarts) => {
         return prevCarts.map((prevCart) => {
            if (prevCart.cartID === activeCart) {
               return {
                  ...prevCart,
                  carts: prevCart.carts.filter((cart) => cart.productID !== productID),
               };
            }
            return prevCart;
         });
      });
   };

   const handleClearCart = () => {
      setCarts((prevCarts) => {
         return prevCarts.map((prevCart) => {
            if (prevCart.cartID === activeCart) {
               return {
                  ...prevCart,
                  carts: [],
                  discount: "",
                  fee: "",
               };
            }
            return prevCart;
         });
      });
   };

   const handleUpdateAdditionalFee = (key: string, value: string) => {
      setCarts((prevCarts) => {
         return prevCarts.map((prevCart) => {
            if (prevCart.cartID === activeCart) {
               return {
                  ...prevCart,
                  [key]: value,
               };
            }
            return prevCart;
         });
      });
   };

   const handleDeleteCharges = (key: string) => {
      setCarts((prevCarts) => {
         return prevCarts.map((prevCart) => {
            if (prevCart.cartID === activeCart) {
               return {
                  ...prevCart,
                  [key]: "",
               };
            }
            return prevCart;
         });
      });
   };

   return (
      <>
         <main className="bg-gray-450 h-[90vh] p-4">
            <div className="container mx-auto">
               <div className="grid gap-5 grid-cols-12">
                  <div className="col-span-8 bg-white border shadow-sm border-secondary-100 rounded-md p-4">
                     <PosTopBar searchTerm={searchTerm} handleSearchTerm={handleSearchChange} />
                     <PosProducts products={filterByNameAndSKU(products)} handleAddToCart={handleAddToCart} />
                  </div>
                  <div className="col-span-4 bg-white border shadow-sm border-secondary-100 rounded-md p-4">
                     <PosCart
                        carts={carts}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleQtyIncrement={handleQtyIncrement}
                        handleQtyDecrement={handleQtyDecrement}
                        handleClearCart={handleClearCart}
                        activeCart={activeCart}
                        setCarts={setCarts}
                        setActiveCart={setActiveCart}
                        newCartsPanel={newCartsPanel}
                        setNewCartsPanel={setNewCartsPanel}
                        handleAddNewCartPanel={handleAddNewCartPanel}
                        handleUpdateAdditionalFee={handleUpdateAdditionalFee}
                        handleDeleteCharges={handleDeleteCharges}
                        handleRemoveCartPanel={handleRemoveCartPanel}
                     />
                  </div>
               </div>
            </div>
         </main>
      </>
   );
};

export default PosSection;
