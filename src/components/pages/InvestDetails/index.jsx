import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// atoms
import Image from "../../atoms/Image";
import Button from "../../atoms/button/Button";
import Heading from "../../atoms/headingContent/Heading";
import TextDisplay from "../../atoms/textContent/TextContent";
import TextSmallLight from "../../atoms/textSmallLight";

// molecules
import FDActionSection from "../../molecules/FDActionSection";
import InvestmentBenefits from "../../molecules/InvestmentBenefits";
import SafetyTrustInfo from "../../molecules/SafetyTrustInfo";
import UserAvatarGroup from "../../molecules/userAvatarGroup";

// organism
import FDsComparison from "../../organism/FDsComparison";
import TenureSelection from "../../organism/TenureSelection";
import FaqSection from "../../organism/faqSection";
import FooterSection from "../../organism/footerSection";
import Loader from "../../organism/loader";
import SomethingWentWrong from "../../organism/something-went-wrong";
import SupportSection from "../../organism/supportSection";
import SmallLoader from "../../organism/loader/smallLoader";

//icons
import ChevronNormal from "../../../Icons/Chevron-normal";

//other imports
import axios from "axios";
import { fetchInvestDetails } from "../../../redux/actions/investDetails";
import { endpoints } from "../../../services/endpoints";
import { getData } from "../../../utils/Crypto";
import { fetchWithWait } from "../../../utils/method";
import WhyInvestWithAltcase from "../../organism/whyInvestWithAltcase";
import InvestDetailsSupportSection from "../../organism/InvestDetailsSupportSection";
import {
  selectCustomStyle,
  selectCustomStyle2,
} from "../../../utils/selectCustomStyle";
import { debounce } from "../../../utils/commonUtils";
import Select from "react-select";

const formatNumberIndian = (value) => {
  let x = value.replace(/\D/g, "");
  let lastThree = x.slice(-3);
  let otherNumbers = x.slice(0, -3);
  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }
  let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return result;
};

const InvestDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: fdid, scheme_master_id, tag } = useParams();
  const { loading } = useSelector((state) => state?.ApplicationLoader);

  const [calculateFdResponse, setCalculateFdResponse] = useState(null);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);

  const [InvestmentAmount, setInvestmentAmount] = useState("100000");
  // const [amount, setAmount] = useState("");
  // const [tenureDays, setTenureDays] = useState(null);
  const [tenure, setTenure] = useState([]);
  const [selectedTenure, setSelectedTenure] = useState({});
  const [defaultTenure, setDefaultTenure] = useState(null);
  const [payout, setPayout] = useState([]);
  const [selectedPayout, setSelectedPayOut] = useState();
  const [cardData, setCardData] = useState(null);
  const [extraData, setExtraData] = useState(null);
  const [calculating, setCalculating] = useState(false);

  // const interestDetails = calculateFdResponse?.interestDetails?.[0];
  // if (interestDetails) {
  //   const firstValue = Object.values(interestDetails)[0];
  //   console.log("First Value:", firstValue);
  // }

  const [activeRow, setActiveRow] = useState(null);
  console.log(activeRow);
  const {
    cardApiResponse,
    cardApiResponseError,
    selectApiResponse,
    selectApiResponseError,
    tableApiError,
    tableApiResponse,
  } = useSelector((state) => state?.investDetails);
  // console.log("activeRow", activeRow);
  // console.log("cardApiResponse", activeRow?.rate_of_interest_r);

  const handleCard = useCallback(() => {
    const data = {
      display_location: "InvestOne",
      tag: "InvestOne",
      investor_id: getData("userData")?.investor_id,
      fd_id: +fdid,
      scheme_master_id: +scheme_master_id,
    };
    fetchWithWait({ dispatch, action: fetchInvestDetails(data) });
  }, [dispatch, fdid, scheme_master_id]);

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/,/g, ""); // Remove existing commas
    setInvestmentAmount(inputValue);
  };

  console.log("asfdasdfas", tableApiResponse);
  const handleCardOnChange = useCallback(
    async (
      tableApiResponse,
      tenure,
      payout,
      InvestmentAmount,
      isSeniorCitizen,
    ) => {
      const dataasda = tableApiResponse?.filter(
        (curval) => curval?.tenure === tenure?.value,
      );

      // Check if dataasda contains any elements
      const minDays = dataasda?.length > 0 ? dataasda[0]?.min_days : 0;
      console.log("Asfdasdfasfdasdfas");
      const data = {
        dob: isSeniorCitizen ? "01-01-1947" : "01-01-2000",
        compounding_type: "monthly",
        // dob: isSeniorCitizen ? "01-01-1947" : "01-01-2000",
        tenure_days: minDays ? Number(minDays) : 0,
        // tenure_year: tenure?.value ? parseFloat(tenure?.value.slice(0, 3)) : 0,
        tenure_year: 0,
        tenure_months: 0,
        fd_id: fdid.toString(),
        investment_amount: Number(InvestmentAmount),
        investor_id: +getData("userData")?.investor_id,
        maturity_type:
          payout?.label === "At Maturity"
            ? "yearly"
            : payout?.label?.toLowerCase(),
        // maturity_type: payout,
        // product_type: "Cumulative",
        product_type:
          payout?.label === "At Maturity" ? "Cumulative" : "Non-Cumulative",
      };
      console.log("tenuretenuretenuretenure", tenure);
      try {
        setCalculating(true);
        const response = await axios.post(
          // "https://altcaseinvestor.we3.in/api/v1/products/calculatefd",
          `${endpoints?.baseUrl}/products/calculatefd`,
          data,
        );
        console.log("respasfdasdfsaonse", response?.data);
        setCalculateFdResponse(response?.data?.data?.data);
      } catch (error) {
        console.log("err", error);
      } finally {
        setCalculating(false);
      }
    },
    [fdid, tableApiResponse],
  );

  // ===================== on submit function =============
  const handleSubmit = () => {
    // alert("handleSubmit");
    console.log("tableApiResponse", tableApiResponse, selectedTenure);
    const Order_Summary = {
      // tenure: tenure,
      activeRow: activeRow,
      tenure: tableApiResponse?.filter(
        (curVal) => curVal?.tenure === selectedTenure.value,
      )?.[0]?.min_days,
      payout: selectedPayout.label,
      InvestmentAmount: InvestmentAmount,
      Interest_Rate: isSeniorCitizen
        ? activeRow?.rate_of_interest_sc
        : activeRow?.rate_of_interest_r,
      // Interest_Rate:
      //   activeRow?.rate_of_interest_r ??
      //   `${cardApiResponse?.[0]?.rate_of_interest.toFixed(2)}%`,
      Total_Interest_Earned: calculateFdResponse?.aggrigated_interest,
      logo_url: cardApiResponse[0]?.logo_url,
      issuer_name: cardApiResponse[0]?.issuer_name,
      CalculateFdResponse: calculateFdResponse,
      fdid: cardApiResponse[0]?.fd_id,
      scheme_master_id: cardApiResponse?.[0]?.scheme_master_id,
      isSeniorCitizen: isSeniorCitizen,
      maturity_amount:
        selectedPayout.label !== "At Maturity"
          ? Object.values(calculateFdResponse?.interestDetails?.[0] || {})[0]
          : calculateFdResponse?.maturity_amount,
    };

    sessionStorage.removeItem("Order_Summary");
    sessionStorage.setItem("Order_Summary", JSON.stringify(Order_Summary));
    navigate("/preview-maturity-action");
  };

  useEffect(() => {
    handleCard();
  }, [handleCard]);

  useEffect(() => {
    document.body.style.backgroundColor = "#F9FAFB";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    setTenure(
      tableApiResponse.map((el) => {
        return { label: el.tenure, value: el.tenure };
      }),
    );
    const firstTenure = tableApiResponse.map((el) => {
      return { label: el.tenure, value: el.tenure };
    })[0];
    setSelectedTenure(firstTenure);

    setPayout(
      selectApiResponse.map((el) => {
        return { label: el.item_value, value: el.item_id };
      }),
    );
    const firstPayout = selectApiResponse.map((el) => {
      return { label: el.item_value, value: el.item_id };
    })[0];
    setSelectedPayOut(firstPayout);
  }, [selectApiResponse, tableApiResponse]);

  const debouncedHandleCardOnChange = useCallback(
    // debounce((tenure, payout, amount, isSeniorCitizen) => {
    //   handleCardOnChange(tenure, payout, amount, handleCardOnChange);
    // }, 100),
    debounce((tableApiResponse, tenure, payout, amount, isSenior) => {
      handleCardOnChange(tableApiResponse, tenure, payout, amount, isSenior);
    }, 200),
    [],
  );
  useEffect(() => {
    if (selectedTenure || selectedPayout || InvestmentAmount) {
      debouncedHandleCardOnChange(
        tableApiResponse,
        selectedTenure,
        selectedPayout,
        InvestmentAmount,
        isSeniorCitizen,
      );
    }
  }, [
    selectedTenure,
    selectedPayout,
    InvestmentAmount,
    debouncedHandleCardOnChange,
    isSeniorCitizen,
    tableApiResponse,
  ]);

  const fetchInvestmentDetails = useCallback(async () => {
    try {
      const response = await axios.post(
        `${endpoints?.baseUrl}/invest/getfdcontent`,
        { fd_id: Number(fdid) },
      );
      const { data } = response;

      if (data?.status === 200) {
        const filterContent = (type) =>
          data?.data.filter((item) => item?.contenttype === type);
        const colors = ["#FFF9DF", "#FFF5F4", "#E8FFED"];

        const updatedCardData = filterContent("Card").map((item, index) => ({
          ...item,
          bgcolor: colors[index % colors.length], // Cycle through the colors
        }));

        setCardData(updatedCardData);
        setExtraData(filterContent("Extra"));
      }
    } catch (error) {
      console.error("Error fetching investment details:", error);
    }
  }, [fdid]);

  useEffect(() => {
    fetchInvestmentDetails();
  }, [fetchInvestmentDetails]);

  // useEffect(() => {
  //   handleCardOnChange(selectedTenure, selectedPayout, InvestmentAmount);
  // }, [handleCardOnChange, selectedTenure, selectedPayout, InvestmentAmount]);

  return (
    <>
      {!cardApiResponse?.length ? (
        <Loader />
      ) : (
        <>
          <div
            className="h-[224px] bg-gradient-to-l "
            style={{
              background: `linear-gradient(to left, ${cardApiResponse[0]?.fd_end_colour}, ${cardApiResponse[0]?.fd_start_colour})`,
            }}
          />
          <div
            id="_parent"
            className="mx-auto  my-4 mb-[-8%] flex w-[90%] max-w-[1008px]  -translate-y-[140px] flex-col gap-4 md:w-[75%] lg:mb-[-6.5%] lg:-translate-y-[150px] lg:flex-row lg:gap-8"
          >
            <div
              id="_main_left"
              className="flex w-full flex-col  gap-6 lg:mb-[60px] lg:w-[58.73%] lg:gap-[60px]"
            >
              {!cardApiResponse?.length && !cardApiResponseError ? (
                <Loader />
              ) : cardApiResponseError && !loading ? (
                <SomethingWentWrong />
              ) : (
                <div
                  id="_top"
                  className="flex h-fit w-full flex-col gap-8 rounded-xl  border-[0.5px] bg-white "
                >
                  <div
                    id="_header"
                    className="flex h-fit justify-between p-8 pb-0"
                  >
                    <div
                      id="bankLogo"
                      className=" flex  h-[60px]  w-[60px]  items-center justify-center  rounded-full border  bg-white lg:h-[80px] lg:w-[80px]"
                    >
                      <Image
                        src={
                          cardApiResponse[0]?.logo_url
                            ? cardApiResponse[0]?.logo_url
                            : ""
                        }
                        alt="bank logo"
                        className="h-[36px] w-[36px] object-contain lg:h-[48px] lg:w-[48px]"
                      />
                    </div>
                    <div
                      id="_middle"
                      className="ml-6 flex flex-1 flex-col gap-4"
                    >
                      <h3 className="bold-text text-2xl leading-8 tracking-[-0.4]">
                        {cardApiResponse[0]?.issuer_name
                          ? cardApiResponse[0]?.issuer_name
                          : ""}
                      </h3>
                      <div
                        id="badget"
                        className=" flex w-fit gap-[6px] rounded-md bg-[#FFF6ED] px-[6px] py-[2px] lg:gap-[10px] lg:px-2  lg:py-1 "
                      >
                        <Image src="/images/Fire.svg" alt="Popular fire icon" />
                        <TextDisplay
                          className="medium-text text-[12px]    leading-5  tracking-[-0.2] text-orange-500 lg:text-sm   lg:leading-6"
                          text={tag ?? "-"}
                          elementType="p"
                        />
                      </div>
                    </div>
                    <div
                      id="_right"
                      className="flex h-[38px] w-[38px]  items-center justify-center rounded-md border p-[10]"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(window.location.href)
                          .then(() => {
                            alert("Link copied to clipboard!");
                          });
                      }}
                    >
                      <img
                        src="/images/shareIcon.svg"
                        alt="share-icon"
                        className="h-[18px] w-[18px] cursor-pointer"
                      />
                    </div>
                  </div>
                  <div
                    id="_earnUptoDetails"
                    className="flex flex-col items-start justify-between gap-5 px-8 sm:flex-row md:gap-0"
                  >
                    <div id="_lefts" className="">
                      <p className="medium-text text-sm leading-6 tracking-[-0.2] text-[#455468]">
                        Earn up to
                      </p>
                      <h5 className="bold-text whitespace-nowrap text-4xl leading-[44px] tracking-[-1] text-[#21B546]">
                        {cardApiResponse[0]?.rate_of_interest?.toFixed(2)}%{" "}
                        <span className="text-2xl leading-8 tracking-[-0.5]">
                          p.a.
                        </span>
                      </h5>
                    </div>

                    <div
                      id="_right"
                      className="flex w-full flex-[0.7] items-center justify-around gap-2 md:gap-5"
                    >
                      <div id="_right_left" className="flex flex-col gap-2">
                        <p className="regular-text text-center text-sm  leading-4 tracking-[-0.2px] text-[#5E718D]">
                          Minimum Deposit
                        </p>
                        <h3 className="semi-bold-text text-center text-lg leading-6 tracking-[-0.3px]">
                          ₹{" "}
                          {cardApiResponse[0]?.deposit_amount
                            ? formatNumberIndian(
                                cardApiResponse[0]?.deposit_amount,
                              )
                            : 0}
                        </h3>
                      </div>
                      <div
                        id="_vertical-line"
                        className="h-[44px] w-[1px] border-[0.5px] bg-[#AFBACA]"
                      ></div>
                      <div id="_right_right" className="flex flex-col gap-2">
                        <p className="regular-text text-center text-sm  leading-4 tracking-[-0.2px] text-[#5E718D]">
                          Lock-in
                        </p>
                        <h3 className="semi-bold-text text-center text-lg leading-6 tracking-[-0.3px]">
                          {cardApiResponse[0]?.lock_days
                            ? `${cardApiResponse[0].lock_days} `
                            : "0 "}
                          days
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div id="avatar" className="flex items-center gap-2 px-8">
                    <TextDisplay
                      className="regular-text  text-[12px] leading-6 tracking-[-0.2] text-[#5E718D] lg:text-[14px]"
                      text={`Invested by ${cardApiResponse[0]?.total_investors ? cardApiResponse[0]?.total_investors : ""} investors `}
                      elementType="p"
                    />
                    <div id="avatarGroup" className="relative flex  ">
                      <UserAvatarGroup />
                    </div>
                  </div>
                  <div
                    id="_bottom"
                    className="flex items-center gap-2 bg-[#E8FFED] px-8 py-4"
                  >
                    <Image src="/images/verifyIcon.svg" alt="verifyIcon" />

                    <TextSmallLight
                      text={
                        cardApiResponse[0]?.fd_heading
                          ? cardApiResponse[0]?.fd_heading
                          : ""
                      }
                      className=" medium-text text-sm leading-6  text-[#21B546]"
                    />
                  </div>
                </div>
              )}

              <TenureSelection
                fdid={cardApiResponse[0]?.fd_id}
                activeRow={activeRow}
                setActiveRow={setActiveRow}
                tenure={tenure}
                setSelectedTenure={setSelectedTenure}
              />

              <InvestmentBenefits
                cardData={cardData}
                cardApiResponse={cardApiResponse}
              />
              <FDsComparison />
              {/* Safety & Trust */}
              <SafetyTrustInfo extraData={extraData} />

              <FDActionSection />

              <WhyInvestWithAltcase />

              {/* <SupportSection isDetails={true} /> */}

              <InvestDetailsSupportSection />

              <FaqSection className={"mx-0 w-full md:w-full"} />
            </div>
            <div
              id="_main_right"
              className="sticky top-56 flex h-fit w-full flex-col gap-3 lg:w-[38.4%]"
            >
              <div
                id="_right"
                className="flex w-full flex-col  gap-5 rounded-xl border-[0.5px] bg-white p-8 md:gap-4 "
              >
                <div id="_first" className="flex flex-col gap-2">
                  <Heading
                    text="Make Investment"
                    type="h3"
                    className="bold-text text-xl leading-6 sm:leading-6 sm:tracking-[-0.5]"
                  />

                  <TextSmallLight
                    text="Choose your amount and preferred tenure"
                    className="regular-text text-sm "
                  />
                </div>
                <div id="_second" className="flex flex-col gap-[6px]">
                  <TextSmallLight
                    text="Investment Amount"
                    className="medium-text text-sm leading-6 text-[#3D4A5C]"
                  />
                  <label
                    htmlFor="emailInput"
                    className={`medium-text flex w-full items-center rounded-md border bg-white`}
                    disabled={false}
                  >
                    <div className="flex cursor-pointer items-center gap-1 border-r border-[#D7DFE9] px-[14px] py-2 text-[#AFBACA]">
                      <img src="/images/rupessIcon.svg" alt="rupessIcon" />
                    </div>
                    <input
                      id="emailInput"
                      type="email"
                      // value={InvestmentAmount}
                      value={formatNumberIndian(InvestmentAmount)}
                      // onChange={debouncedHandleChange}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className={
                        "medium-text placeholder:regular-text w-full rounded-md border border-none border-[#AFBACA] bg-white  p-2    text-sm leading-6 tracking-[-0.2] text-[#1B1B1B] outline-none placeholder:text-sm "
                      }
                    />
                  </label>
                </div>
                <div
                  id="_third_TenureandCompounding"
                  className="flex justify-between gap-5"
                >
                  <div id="_left" className="flex flex-1 flex-col gap-[6px]">
                    <label
                      htmlFor=""
                      className="medium-text text-sm leading-6 tracking-[-0.2] text-[#3D4A5C]"
                    >
                      Tenure
                    </label>
                    {!tableApiError && tenure?.length > 0 && (
                      <Select
                        name="Tenure"
                        // defaultValue={defaultTenure ?? tenure[0]}
                        value={selectedTenure}
                        options={tenure || []}
                        onChange={(e) => {
                          console.log(e);
                          setSelectedTenure(e);
                        }}
                        styles={selectCustomStyle2}
                        isSearchable={false}
                        isClearable={false}
                      />
                    )}
                  </div>
                  <div id="_right" className="flex flex-1 flex-col gap-[6px]">
                    <label
                      htmlFor=""
                      className="medium-text text-sm leading-6 tracking-[-0.2] text-[#3D4A5C]"
                    >
                      Payout
                    </label>
                    {payout?.length && (
                      <Select
                        name="Payout"
                        defaultValue={payout[0]}
                        options={payout || []}
                        onChange={(e) => {
                          console.log(e);
                          setSelectedPayOut(e);
                        }}
                        styles={selectCustomStyle2}
                        isSearchable={false}
                        isClearable={false}
                      />
                    )}
                  </div>
                </div>
                <div id="_fourth">
                  <label className="flex cursor-pointer items-center gap-1">
                    <input
                      type="checkbox"
                      value=""
                      disabled={activeRow === null ? true : false}
                      className="peer sr-only"
                      checked={isSeniorCitizen}
                      onChange={(e) => {
                        setIsSeniorCitizen(e.target.checked ? true : false);
                        console.log(
                          "e.target.checked",
                          e.target.checked ? true : false,
                        );
                      }}
                    />
                    <div className="peer relative h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#28BF4E] peer-checked:after:translate-x-full  "></div>
                    <TextSmallLight
                      text="I am a Senior Citizen"
                      className=" medium-text  text-sm  leading-6 text-[#2D3643]"
                    />
                  </label>
                </div>
                <div id="_fifth " className="flex flex-col gap-2">
                  <div
                    id="_first"
                    className="flex items-center justify-between"
                  >
                    <TextSmallLight
                      text="Interest Rate"
                      className="regular-text text-sm leading-6"
                    />
                    {calculating ? (
                      <SmallLoader />
                    ) : (
                      <h3 className="bold-text max-h-6 text-right text-2xl leading-6 tracking-[-0.5] text-[#21B546]">
                        {/* {activeRow?.rate_of_interest_r ??
                              `${cardApiResponse?.[0]?.rate_of_interest.toFixed(2)}%`} */}
                        {isSeniorCitizen
                          ? activeRow?.rate_of_interest_sc
                          : activeRow?.rate_of_interest_r}{" "}
                        <span className=" text-sm leading-5 tracking-[-0.3]">
                          p.a.
                        </span>
                      </h3>
                    )}
                  </div>
                  <div
                    id="_first"
                    className="flex max-h-6 items-center justify-between"
                  >
                    <TextSmallLight
                      text={` ${selectedPayout?.label} you will get`}
                      className="regular-text text-sm leading-6"
                    />
                    {calculating ? (
                      <SmallLoader />
                    ) : (
                      <Heading
                        // text={`₹ ${calculateFdResponse?.maturity_amount}`}
                        // text={`₹ ${calculateFdResponse?.maturity_amount}`}
                        text={`₹ ${
                          selectedPayout?.label !== "At Maturity"
                            ? Object.values(
                                calculateFdResponse?.interestDetails?.[0] || {},
                              )[0]
                            : calculateFdResponse?.maturity_amount || ""
                        }
                      `}
                        type="h3"
                        className=" bold-text text-base leading-6  "
                      />
                    )}
                  </div>
                  <div
                    id="_first"
                    className="flex max-h-6 items-center justify-between"
                  >
                    <TextSmallLight
                      text="Total Interest Earned"
                      className="regular-text text-sm leading-6"
                    />
                    {calculating ? (
                      <SmallLoader />
                    ) : (
                      <h3 className="bold-text text-base leading-6 tracking-[-0.3] text-[#21B546]">
                        ₹ {calculateFdResponse?.aggrigated_interest}
                      </h3>
                    )}
                  </div>
                </div>
                <Button
                  disabled={!calculateFdResponse || calculating}
                  onClick={handleSubmit}
                  label="Proceed"
                  className={`medium-text mt-2 max-h-12  ${
                    !calculateFdResponse || calculating
                      ? "bg-[#F0F3F9] text-[#AFBACA] opacity-60"
                      : "bg-custom-green text-[#fff] opacity-100"
                  }`}
                />
              </div>
              <div
                id="_bottom"
                className="flex  items-baseline justify-center gap-2"
              >
                <img
                  src="/images/bank-logo.svg"
                  alt="logo"
                  className="h-[1.125rem] w-[1.125rem]"
                />
                <span className="text-sm leading-5 tracking-[-0.2] text-[#8897AE]">
                  Your funds will go directly into State Bank of India
                </span>
              </div>
            </div>
          </div>
          <FooterSection />
        </>
      )}
    </>
  );
};

export default InvestDetails;
