import { useState } from "react";

const useCalculator = () => {
   const [value, setValue] = useState("");

   const handleSetValue = (newValue: string | number, exact = false) => {
       
      if (exact) {
         setValue(String(newValue));
      } else {
         if (newValue === "delete") {
            setValue((prevValue) => prevValue.slice(0, prevValue.length - 1));
         } else {
            setValue((prevValue) => prevValue + newValue);
         }
      }
   };

   return {
      value,
      handleSetValue,
   };
};

export default useCalculator;
