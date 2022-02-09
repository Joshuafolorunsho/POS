import { Option } from "@/components/Common/CustomSelect";
import React, { useEffect, useState } from "react";

const usePagination = (data) => {
   const [currentPage, setCurrentPage] = useState(0);
   const [perPage, setPerPage] = useState(10);
   const options = [
      {
         label: 10,
         value: 10,
      },
      {
         label: 20,
         value: 20,
      },
      {
         label: 30,
         value: 30,
      },
      {
         label: 40,
         value: 40,
      },
      {
         label: 50,
         value: 50,
      },
      {
         label: 60,
         value: 60,
      },
      {
         label: 70,
         value: 70,
      },
      {
         label: 80,
         value: 80,
      },
   ];
   const offset = currentPage * perPage;
   const pageCount = Math.ceil(data.length / perPage);


   useEffect(() => {
      if (data.length < 10) {
         options.unshift({
            label: data.length,
            value: data.length,
         });
         setPerPage(data.length);
      }
   }, []);

   const handlePaginationLength = (option: Option) => {
      setPerPage(Number(option.value));
   };

   const handlePageClick = ({ selected }: any) => {
      setCurrentPage(selected);
   };

   return {
      offset,
      perPage,
      options,
      handlePaginationLength,
      handlePageClick,
      pageCount,
   };
};

export default usePagination;
