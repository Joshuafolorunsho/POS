import formatCurrency from "./formatCurrency";

export const calculatePercentage = (total: number, percentage: string): number => {
   let numberWithoutPercentSign = percentage.substring(0, percentage.length - 1);
   return total * (Number(numberWithoutPercentSign) / 100);
};

export const calculatePercentageOrReturnAmountPlusSign = (total: number, percentage: string, sign = "-"): string => {
   // if (percentage ) {
   if (percentage && percentage.includes("~%")) {
      const percentageArr = percentage.split("~");
      return sign + formatCurrency(calculatePercentage(total, `${percentageArr[0]}%`));
   } else {
      return sign + formatCurrency(Number(percentage));
   }
   // }
};

export const calcPercentageOrReturnAmountPlusSign = (total: number, percentage: string, sign = "-"): string => {
   // if (percentage ) {
   if (percentage && percentage.includes("%")) {
      return sign + formatCurrency(calculatePercentage(total, percentage));
   } else {
      return sign + formatCurrency(Number(percentage));
   }
   // }
};
