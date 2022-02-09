import React from "react";

const Loader = () => {
   return (
      <div className="absolute top-0 bg-primary-550 bg-opacity-70 inset-0 z-50">
         <div className="flex items-center justify-center [height:90vh]">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: "auto", display: "block", shapeRendering: "auto" }} width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
               <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#fff" stroke="none">
                  <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
               </path>
            </svg>
         </div>
      </div>
   );
};

export default Loader;
