import { Store } from "@/types";

export const getStoreOptions = (storeData: {data: Store[]}) => {
   const options =
      storeData &&
      storeData.data.map(({ storeName, storeID }) => {
         return {
            label: storeName,
            value: storeID,
         };
      });

   return options;
};

export const lastDurationOptions = [
   {
      label: "Last 30 Days",
      value: "Last 30 Days",
   },
   {
      label: "Last 6 Months",
      value: "Last 6 Months",
   },
   {
      label: "Last 1 Years",
      value: "Last 1 Years",
   },
];