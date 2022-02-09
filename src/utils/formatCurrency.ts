const formatCurrency = (number: number): string => {
   const formatted = (number)
      .toLocaleString("en-NG", {
         style: "currency",
         currency: "NGN",
      });
      return formatted;
};

export default formatCurrency;
