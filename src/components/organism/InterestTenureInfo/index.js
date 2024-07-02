// import React from "react";

// const InterestTenureInfo = ({isPortfolio}) => {
//   return (
//     <div className="flex items-center justify-between">
//       <div id="_first" className="flex flex-col items-start gap-2">
//         <p className="regular-text text-[12px] leading-5 tracking-[-0.2] text-[#5E718D] md:text-sm md:leading-7">
//            {isPortfolio ? "Current Value" : "Interest Rate"}
//         </p>
//         <h6 className="semi-bold-text text-base leading-7 tracking-[-0.3] text-[#21B546] md:text-lg md:leading-[30px]">
//         ₹3,17,430
//         </h6>
//       </div>
//       <div id="_second" className="flex flex-col gap-2">
//         <p className="regular-text text-[12px] leading-5 tracking-[-0.2] text-[#5E718D]">
//           Tenure

//         </p>
//         <h6 className="semi-bold-text text-base leading-7 tracking-[-0.3] text-[#1B1B1B] md:text-lg md:leading-[30px]">
//           1 year
//         </h6>
//       </div>
//       <div id="_third" className="flex flex-col items-end gap-2">
//         <p className="regular-text text-[12px] leading-5 tracking-[-0.2] text-[#5E718D]">
//         {isPortfolio ? "Interest Earned" : "Interest on 1 Lac"}

//         </p>
//         <h6 className="semi-bold-text text-base leading-7 tracking-[-0.3] text-[#1B1B1B] md:text-lg md:leading-[30px]">
//           ₹ 34,850
//         </h6>
//       </div>
//     </div>
//   );
// };

// export default InterestTenureInfo;

import React from "react";
import { formatIndianNumber } from "../../../utils/commonUtils";

const InterestTenureInfo = ({ isPortfolio, curVal }) => {
  return (
    <div className="flex items-center justify-between">
      <div id="_first" className="flex flex-col items-start gap-2">
        <p className="regular-text text-[12px] leading-5 tracking-[-0.2] text-[#5E718D] md:text-sm md:leading-7">
          {isPortfolio ? "Current Value" : "Interest Rate"}
        </p>
        <h6 className="semi-bold-text text-base leading-7 tracking-[-0.3] text-[#21B546] md:text-lg md:leading-[30px]">
          {/* 7.50% p.a. */}
          {/* {curVal?.rate_of_interest && curVal.rate_of_interest}% p.a. */}
          {isPortfolio
            ? curVal?.fd_current_value &&
              formatIndianNumber(curVal?.fd_current_value)
            : curVal?.rate_of_interest
              ? `${curVal.rate_of_interest}% p.a.`
              : "-"}
        </h6>
      </div>
      <div
        id="_second"
        className="flex flex-col gap-2 md:min-h-[66px] md:justify-between"
      >
        <p className="regular-text text-sm leading-5 tracking-[-0.2] text-[#5E718D]">
          Tenure
        </p>
        <h6 className="semi-bold-text text-base leading-7 tracking-[-0.3] text-[#1B1B1B] md:text-lg md:leading-[30px]">
          {/* 1 year */}
          {/* {curVal?.tenure && curVal.tenure} */}
          {isPortfolio
            ? curVal?.tenure && curVal.tenure
            : curVal?.tenure && curVal.tenure}
        </h6>
      </div>
      <div
        id="_third"
        className="flex flex-col items-end gap-2 md:min-h-[66px] md:justify-between"
      >
        <p className="regular-text text-sm leading-5 tracking-[-0.2] text-[#5E718D]">
          {isPortfolio ? "Interest Earned" : "Interest on 1 Lac"}
        </p>
        <h6 className="semi-bold-text text-base leading-7 tracking-[-0.3] text-[#1B1B1B] md:text-lg md:leading-[30px]">
          {/* ₹ 34,850 */}
          {/* {curVal?.interest_amount_1l ? `₹${curVal.interest_amount_1l}` : "-"} */}

          {isPortfolio
            ? curVal?.fd_interest_earned || ""
            : curVal?.interest_amount_1l || ""}
        </h6>
      </div>
    </div>
  );
};

export default InterestTenureInfo;
