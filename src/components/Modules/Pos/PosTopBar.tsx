import SearchInput from "@/components/Common/SearchInput";
import useFilterBySearch from "@/hooks/useFilterBySearch";
import React, { ChangeEvent, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slider from "react-slick";

interface CategoryButtonProps {
   name: string;
   activeTab: string;
   handleClick: any;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ name, activeTab, handleClick }) => {
   const active = name.toLowerCase() === activeTab.toLowerCase();
   return (
      <button onClick={handleClick} className={`px-2 pb-1 capitalize ${active ? " border-b-2 border-red-700 text-secondary-100" : "text-gray-250"}`}>
         {name}
      </button>
   );
};

const categories = ["drinks", "snacks", "beverages", "gadgets", "toiletries", "fruits", "detergent"];

interface PosTopBarProps {
   searchTerm: string;
   handleSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PosTopBar: React.FC<PosTopBarProps> = ({ searchTerm, handleSearchTerm }) => {
   const sliderRef = React.useRef(null);
   const [activeView, setActiveView] = useState("grid");
   const [activeTab, setActiveTab] = useState("drinks");

   const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
   };

   const handleClick = (tab: string) => {
      setActiveTab(tab);
   };

   return (
      <>
         <div className="grid h-[8vh] grid-cols-16 items-center gap-3">
            <div className="col-span-5">
               <SearchInput value={searchTerm} handleChange={handleSearchTerm} placeholder="Search products" />
            </div>
            <div className="col-span-9">
               <div className="mx-8 text-sm">
                  <Slider ref={sliderRef} {...settings} className="border-b border-secondary-100">
                     {categories.map((category) => {
                        return <CategoryButton key={category} activeTab={activeTab} handleClick={() => handleClick(category)} name={category} />;
                     })}
                  </Slider>
               </div>
            </div>
            <div className="col-span-2 flex items-center justify-center space-x-2 rounded-full border border-secondary-100 px-2 py-1">
               <div className={`${activeView === "grid" ? "bg-secondary-100" : ""} flex h-7 w-7 items-center justify-center rounded-full`}>
                  <svg className={`fill-current ${activeView === "grid" ? "text-white" : "text-[#677994]"}`} width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M5.875 0.625H2.375C1.91087 0.625 1.46575 0.809374 1.13756 1.13756C0.809374 1.46575 0.625 1.91087 0.625 2.375V5.875C0.625 6.33913 0.809374 6.78425 1.13756 7.11244C1.46575 7.44063 1.91087 7.625 2.375 7.625H5.875C6.33913 7.625 6.78425 7.44063 7.11244 7.11244C7.44063 6.78425 7.625 6.33913 7.625 5.875V2.375C7.625 1.91087 7.44063 1.46575 7.11244 1.13756C6.78425 0.809374 6.33913 0.625 5.875 0.625ZM14.625 0.625H11.125C10.6609 0.625 10.2158 0.809374 9.88756 1.13756C9.55937 1.46575 9.375 1.91087 9.375 2.375V5.875C9.375 6.33913 9.55937 6.78425 9.88756 7.11244C10.2158 7.44063 10.6609 7.625 11.125 7.625H14.625C15.0891 7.625 15.5342 7.44063 15.8624 7.11244C16.1906 6.78425 16.375 6.33913 16.375 5.875V2.375C16.375 1.91087 16.1906 1.46575 15.8624 1.13756C15.5342 0.809374 15.0891 0.625 14.625 0.625ZM5.875 9.375H2.375C1.91087 9.375 1.46575 9.55937 1.13756 9.88756C0.809374 10.2158 0.625 10.6609 0.625 11.125V14.625C0.625 15.0891 0.809374 15.5342 1.13756 15.8624C1.46575 16.1906 1.91087 16.375 2.375 16.375H5.875C6.33913 16.375 6.78425 16.1906 7.11244 15.8624C7.44063 15.5342 7.625 15.0891 7.625 14.625V11.125C7.625 10.6609 7.44063 10.2158 7.11244 9.88756C6.78425 9.55937 6.33913 9.375 5.875 9.375ZM14.625 9.375H11.125C10.6609 9.375 10.2158 9.55937 9.88756 9.88756C9.55937 10.2158 9.375 10.6609 9.375 11.125V14.625C9.375 15.0891 9.55937 15.5342 9.88756 15.8624C10.2158 16.1906 10.6609 16.375 11.125 16.375H14.625C15.0891 16.375 15.5342 16.1906 15.8624 15.8624C16.1906 15.5342 16.375 15.0891 16.375 14.625V11.125C16.375 10.6609 16.1906 10.2158 15.8624 9.88756C15.5342 9.55937 15.0891 9.375 14.625 9.375Z" />
                  </svg>
               </div>
               <div className={`${activeView === "list" ? "bg-secondary-100" : ""} flex h-7 w-7 items-center justify-center rounded-full`}>
                  <svg className={`fill-current ${activeView === "list" ? "text-white" : "text-[#677994]"}`} width="17" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 6C1.55 6 2 5.55 2 5C2 4.45 1.55 4 1 4C0.45 4 0 4.45 0 5C0 5.55 0.45 6 1 6ZM1 10C1.55 10 2 9.55 2 9C2 8.45 1.55 8 1 8C0.45 8 0 8.45 0 9C0 9.55 0.45 10 1 10ZM1 2C1.55 2 2 1.55 2 1C2 0.45 1.55 0 1 0C0.45 0 0 0.45 0 1C0 1.55 0.45 2 1 2ZM5 6H17C17.55 6 18 5.55 18 5C18 4.45 17.55 4 17 4H5C4.45 4 4 4.45 4 5C4 5.55 4.45 6 5 6ZM5 10H17C17.55 10 18 9.55 18 9C18 8.45 17.55 8 17 8H5C4.45 8 4 8.45 4 9C4 9.55 4.45 10 5 10ZM4 1C4 1.55 4.45 2 5 2H17C17.55 2 18 1.55 18 1C18 0.45 17.55 0 17 0H5C4.45 0 4 0.45 4 1ZM1 6C1.55 6 2 5.55 2 5C2 4.45 1.55 4 1 4C0.45 4 0 4.45 0 5C0 5.55 0.45 6 1 6ZM1 10C1.55 10 2 9.55 2 9C2 8.45 1.55 8 1 8C0.45 8 0 8.45 0 9C0 9.55 0.45 10 1 10ZM1 2C1.55 2 2 1.55 2 1C2 0.45 1.55 0 1 0C0.45 0 0 0.45 0 1C0 1.55 0.45 2 1 2ZM5 6H17C17.55 6 18 5.55 18 5C18 4.45 17.55 4 17 4H5C4.45 4 4 4.45 4 5C4 5.55 4.45 6 5 6ZM5 10H17C17.55 10 18 9.55 18 9C18 8.45 17.55 8 17 8H5C4.45 8 4 8.45 4 9C4 9.55 4.45 10 5 10ZM4 1C4 1.55 4.45 2 5 2H17C17.55 2 18 1.55 18 1C18 0.45 17.55 0 17 0H5C4.45 0 4 0.45 4 1Z" />
                  </svg>
               </div>
            </div>
         </div>
      </>
   );
};

const PrevArrow = (props: any) => {
   const { className, onClick } = props;
   return (
      <button className={`pos-prev-arrow absolute top-1/2 -translate-y-1/2 ${className}`} onClick={onClick}>
         <FiChevronLeft color="#C8CFDA" fontSize={18} />
      </button>
   );
};

const NextArrow = (props: any) => {
   const { className, onClick } = props;
   return (
      <button className={`pos-next-arrow absolute top-1/2 -translate-y-1/2 ${className}`} onClick={onClick}>
         <FiChevronRight color="#C8CFDA" fontSize={18} />
      </button>
   );
};

export default PosTopBar;
