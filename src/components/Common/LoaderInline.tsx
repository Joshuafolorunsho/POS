import React from "react";

const LoaderInline = () => {
   return (
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: "auto", display: "block", shapeRendering: "auto" }} width="20px" height="20px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
         <circle cx="50" cy="50" fill="none" stroke="#fff" strokeWidth="9" r="28" strokeDasharray="131.94689145077132 45.982297150257104">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
         </circle>
      </svg>
   );
};

export default LoaderInline;
