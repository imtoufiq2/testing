import React from "react";
import UpiMethod from "../upiMethod/UpiMethod";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Image from "../../atoms/Image";

const OnlinePaymentMode = ({
  setActiveIndex,
  activeIndex,
  upiData,
  qrCode,
  paymentOptions,
}) => {
  return (
    <>
      <fieldset
        className={` rounded-xl border-[0.5px]  ${
          activeIndex !== 0 ? "border" : "border-[#21B546] "
        }`}
      >
        <legend className="medium-text mr-5 rounded-md bg-[#FFC700] px-2 py-[2] text-right text-xs  leading-5 tracking-[-0.2] text-white">
          Recommended
        </legend>
        <div id="parent" className="flex flex-col gap-5 p-5">
          <div
            id="top"
            className="flex items-center justify-between"
            onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}
          >
            <div className="flex gap-3">
              <div
                id="logo"
                className=" min-h-[2.8125rem] min-w-[2.8125rem]  rounded-md border p-[0.4375rem]"
              >
                <Image
                  src={"/images/upi.svg"}
                  className="w-full h-full min-w-7 min-h-7"
                  alt="UPI-icon"
                
                />
              </div>
              <div id="addUPI">
                <h3 className="semi-bold-text text-sm  leading-6 tracking-[-0.2] text-[#1B1B1B]">
                  Add Bank via UPI
                </h3>
                <p className="regular-text text-xs  leading-5 tracking-[-0.2] text-[#5E718D]">
                  Fast and automatic verification
                </p>
              </div>
            </div>
            <div id="icon">
              {activeIndex === 0 ? (
                <BsChevronUp color={"#A3ADBC"} size={20} />
              ) : (
                <BsChevronDown color={"#A3ADBC"} size={20} />
              )}
            </div>
          </div>
          <div
            id="bot"
            className={`${
              activeIndex !== 0 ? "hidden" : "flex"
            }  flex-col gap-2 transition-all duration-200 ease-in-out `}
          >
            <div
              id="text"
              className="medium-text text-center text-xs  leading-5 tracking-[-0.2] text-[#5E718D]"
            >
            <span className="md:hidden">Choose your UPI app</span>  
            </div>
            <div
              id="bottomDiv"
              className="flex flex-col gap-8  md:gap-5 md:flex-row md:items-center md:justify-between"
            >
              <div
                id="scanner"
                // className="m-auto min-h-[10rem] min-w-[10rem] border  "
                     className=" min-h-[10rem] min-w-[10rem] md:border mx-auto md:mx-0 "
              >
                <Image
                  src={qrCode}
                  alt="Please wait..."
                  className="w-full h-full max-w-[12rem] max-h-[12rem]"
                  // className="h-32 w-32"
                />
              </div>
             <div className="flex flex-col items-center md:gap-2">
             
             <span className="hidden md:block medium-text text-center text-xs  leading-5 tracking-[-0.2] text-[#5E718D]">Scan this QR code using your UPI app</span>
             <div
                id="bottom"
                className="m-auto flex h-fit  w-full items-center justify-around"
              >
                {upiData?.map((upiInfo, index) => {
                  return (
                    <UpiMethod
                      key={index}
                      upiInfo={upiInfo}
                      paymentOptions={paymentOptions}
                    />
                  );
                })}
              </div>
             </div>
            </div>
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OnlinePaymentMode;
