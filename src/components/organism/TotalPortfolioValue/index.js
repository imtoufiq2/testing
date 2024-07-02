import { useNavigate } from "react-router-dom";

import Image from "../../atoms/Image";
import PortfolioInfoText from "../../atoms/PortfolioInfoText";
import EarnedTodayMessage from "../../atoms/earnedTodayMessage";

import { formatIndianNumber } from "../../../utils/commonUtils";

const TotalPortfolioValue = ({ FDInvestmentSummary }) => {
  const navigate=useNavigate()
  return (
    <>
      <div id="_box_number_one" className="rounded-xl border-[0.5px] bg-white">
        <div
          id="_flexb0x"
          className="flex flex-col gap-5 p-5 lg:flex-row lg:items-start  lg:justify-between lg:gap-2"
        >
          <div id="_first" className="flex flex-col gap-2">
            <PortfolioInfoText text="Total Portfolio Value" />
            <h3 className="flex items-center gap-2">
              <span className="bold-text text-2xl leading-8 tracking-[-0.5px]">
                <span className="regular-text text-base ">₹ </span>
                {FDInvestmentSummary?.fd_current_value ?
                  formatIndianNumber(FDInvestmentSummary.fd_current_value):0}
              </span>
              <span className="medium-text flex items-center gap-2 text-sm leading-6 tracking-[-0.2] text-[#21B546]">
                <Image
                  src="/images/green-grow.svg"
                  alt="grow"
                  className="h-[0.56rem] w-[0.91rem]"
                />

                <span>{FDInvestmentSummary?.rate_of_interest ?FDInvestmentSummary?.rate_of_interest: 0.00 + "% ROI "}</span>
              </span>
            </h3>
          </div>
          <div
            id="_second"
            className="flex flex-1  items-center justify-between gap-2 md:gap-3 lg:justify-evenly"
          >
            <div id="_left" className="flex flex-col gap-1 items-baseline md:min-h-[60px] md:justify-between">
              <PortfolioInfoText text="Total Investment" />
              <h3 className="semi-bold-text text-2xl  leading-7 tracking-[-0.3] text-[#1B1B1B]">
                <span className="regular-text text-base">₹ </span>
                {FDInvestmentSummary?.investment_amount ?
                  formatIndianNumber(FDInvestmentSummary.investment_amount) :0}
              </h3>
            </div>
            <div id="_right" className="flex flex-col gap-1 md:min-h-[60px] md:items-baseline md:justify-between">
              <PortfolioInfoText text="Total Earnings" />
              <h3 className="regular-text text-end text-base leading-7 tracking-[-0.3] text-[#21B546]">
                ₹{" "}
                <span className="semi-bold-text text-2xl"> 
                  {formatIndianNumber(FDInvestmentSummary?.fd_interest_earned) ? formatIndianNumber(FDInvestmentSummary?.fd_interest_earned) :0}
                </span>
              </h3>
            </div>
          </div>
          <div
            id="_third_passbox"
            className=" hidden items-center justify-center gap-2 lg:flex border border-[#55D976] rounded-md py-2 px-[15px] md:self-center cursor-pointer"
            onClick={()=>navigate("/transaction-history")}
          >
        

            <Image
              src="/images/viewPassbookIcon.svg"
              alt="passbook"
              className="h-[#0.56] w-[0.98rem]"
            />
            <span className="medium-text text-sm leading-6 tracking-[-0.2] text-[#21B546]">
              View Passbook
            </span>
          </div>
        </div>
        <EarnedTodayMessage
          dynamic
          earned={FDInvestmentSummary?.fd_interest_earned}
        />
      </div>
      {/* this is passbook for the mobile */}
      <div
        id="_div"
        className="flex items-center justify-center gap-2 lg:hidden cursor-pointer"
        onClick={()=>navigate("/transaction-history")}
      >
        <Image
          src="/images/viewPassbookIcon.svg"
          alt="passbook"
          className="h-[#0.56] w-[0.98rem]"
        />
        <span className="medium-text text-sm leading-6 tracking-[-0.2] text-[#21B546]">
          View Passbook
        </span>
      </div>
    </>
  );
};

export default TotalPortfolioValue;
