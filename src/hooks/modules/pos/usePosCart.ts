import { useState } from "react";

const usePosCart = () => {
   const [additionalCharges, setAdditionalCharges] = useState(false);
   const [additionalChargesString, setAdditionalChargesString] = useState("");

   const handleShow = (action: string) => {
      setAdditionalChargesString(action);
      setAdditionalCharges(true);
   };

   const handleClose = () => setAdditionalCharges(false);

   return {
      additionalCharges,
      additionalChargesString,
      handleShow,
      handleClose,
   };
};

export default usePosCart;
