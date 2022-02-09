import formatCurrency from "./formatCurrency";

export const formatFigureWithBracket = (amount: string) => {
   if (amount) {
      if (amount.includes("~%")) {
         const amountArr = amount.split('~');
         return `(${amountArr[0]}%)`;
      } else {
         return `(${formatCurrency(Number(amount))})`;
      }
   }
};

export const formatFigureWithBracketWithNormalPercentage = (amount: string) => {
   if (amount) {
      if (amount.includes("%")) {
         return amount;
      } else {
         return `(${formatCurrency(Number(amount))})`;
      }
   }
};
