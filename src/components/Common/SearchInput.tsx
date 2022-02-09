import React from "react";

interface SearchInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
}

const SearchInput:React.FC<SearchInputProps> = ({handleChange, placeholder, value}) => {
   return (
      <div className="relative h-8">
         <input onChange={handleChange} className="h-full text-xs border rounded-full px-4 w-full focus:outline-none focus:ring-1 focus:ring-gray-300" type="text" placeholder={placeholder} value={value} />
         <div className="absolute bg-secondary-100 top-1/2 -translate-y-1/2 bottom-0 right-1 flex items-center justify-center w-5 h-5 rounded-full">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M13.5325 12.4675L10.9825 9.925C11.8052 8.87684 12.2517 7.58249 12.25 6.25C12.25 5.06331 11.8981 3.90328 11.2388 2.91658C10.5795 1.92989 9.64246 1.16085 8.5461 0.706725C7.44975 0.2526 6.24335 0.13378 5.07946 0.365291C3.91558 0.596802 2.84648 1.16825 2.00736 2.00736C1.16825 2.84648 0.596802 3.91558 0.365291 5.07946C0.13378 6.24335 0.2526 7.44975 0.706725 8.5461C1.16085 9.64246 1.92989 10.5795 2.91658 11.2388C3.90328 11.8981 5.06331 12.25 6.25 12.25C7.58249 12.2517 8.87684 11.8052 9.925 10.9825L12.4675 13.5325C12.5372 13.6028 12.6202 13.6586 12.7116 13.6967C12.803 13.7347 12.901 13.7544 13 13.7544C13.099 13.7544 13.197 13.7347 13.2884 13.6967C13.3798 13.6586 13.4628 13.6028 13.5325 13.5325C13.6028 13.4628 13.6586 13.3798 13.6967 13.2884C13.7347 13.197 13.7544 13.099 13.7544 13C13.7544 12.901 13.7347 12.803 13.6967 12.7116C13.6586 12.6202 13.6028 12.5372 13.5325 12.4675ZM1.75 6.25C1.75 5.35999 2.01392 4.48996 2.50839 3.74994C3.00286 3.00992 3.70566 2.43314 4.52793 2.09254C5.35019 1.75195 6.25499 1.66284 7.12791 1.83647C8.00082 2.0101 8.80265 2.43869 9.43198 3.06802C10.0613 3.69736 10.4899 4.49918 10.6635 5.3721C10.8372 6.24501 10.7481 7.14981 10.4075 7.97208C10.0669 8.79435 9.49009 9.49715 8.75007 9.99162C8.01005 10.4861 7.14002 10.75 6.25 10.75C5.05653 10.75 3.91194 10.2759 3.06802 9.43198C2.22411 8.58807 1.75 7.44348 1.75 6.25Z"
                  fill="white"
               />
            </svg>
         </div>
      </div>
   );
};

export default SearchInput;
