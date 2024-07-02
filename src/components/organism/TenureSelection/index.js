import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";

import ChevronNormal from "../../../Icons/Chevron-normal";
import axios from "axios";
import { getData } from "../../../utils/Crypto";

import { GoChevronDown, GoChevronUp } from "react-icons/go";

import {
  fetchSelectData,
  fetchTableData,
} from "../../../redux/actions/investDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithWait } from "../../../utils/method";
import Loader from "../loader";
import SomethingWentWrong from "../something-went-wrong";
import { endpoints } from "../../../services/endpoints";
import SpecialOffers from "../../molecules/specialOffers";
// import { selectCustomStyle } from "../../../utils/selectCustomStyle";

const TenureSelection = ({
  fdid,
  setActiveRow,
  activeRow,
  tenure,
  setSelectedTenure,
}) => {
  const { loading } = useSelector((state) => state?.ApplicationLoader);
  const dispatch = useDispatch();
  sessionStorage.setItem("fdId", fdid);
  const {
    cardApiResponse,
    cardApiResponseError,
    selectApiResponse,
    selectApiResponseError,
    tableApiError,
    tableApiResponse,
  } = useSelector((state) => state?.investDetails);
  console.log("tableResponse", tableApiResponse);
  console.log("selectApiResponse", selectApiResponse);

  const [payOutMethod, setPayOutMethod] = useState("");

  const [Data, setData] = useState([]);
  const [showAllData, setShowAllData] = useState(false);
  const [allTableData, setAllTableData] = useState([]);
  const [slicedTableData, setSlicedTableData] = useState([]);
  const [remainingTableData, setRemainingTableData] = useState([]);
  const [payoutType, setPayoutType] = useState([]);

  const selectCustomStyle2 = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#F0F3F9",
      borderColor: "transparent",
      boxShadow: "none",
      minHeight: "30px",
      "&:hover": {
        borderColor: "transparent",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#5e718d", // This sets the text color of the selected value
      fontWeight: 600,
      lineHeight: "24px",
      fontSize: "14px",
      letterSpacing: "-0.2px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#5e718d", // Optional: set placeholder color
    }),
    option: (provided, state) => ({
      ...provided,
      // backgroundColor: state.isSelected ? "#21B546" : "white",
      backgroundColor: state.isSelected ? "#F9FAFB" : "white",
      color: state.isSelected ? "#3D4A5C" : "#3D4A5C",
      "&:hover": {
        // backgroundColor: state.isSelected ? "#21B546" : "#F9FAFB",
        backgroundColor: "#F9FAFB",
        color: state.isSelected && "#3D4A5C",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      width: "0px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#5e718d",
      paddingLeft: "4px",
      cursor: "pointer",
      "&:hover": {
        color: "#21B546",
      },
    }),
  };
  const handleSelect = useCallback(() => {
    const data = {
      display_location: "PayoutMethods",
      tag: "PayoutMethods",
      fd_id: fdid,
    };
    fetchWithWait({ dispatch, action: fetchSelectData(data) });
  }, []);
  const handleShowAllTenure = () => {
    console.log(showAllData);
    if (!showAllData) {
      setSlicedTableData((prev) => {
        return [...prev, ...remainingTableData];
      });
      console.log(activeRow, "Active Row");
      console.log("All Cols", [...slicedTableData, ...remainingTableData]);
      const alreadySelected = [
        ...slicedTableData,
        ...remainingTableData,
      ].filter((el) => el.tenure === activeRow.tenure);
      console.log(alreadySelected);
      setActiveRow(alreadySelected[0]);
      setShowAllData(!showAllData);
      return;
    } else {
      setSlicedTableData(firstFiveScheme(slicedTableData));
      setShowAllData(!showAllData);
      return;
    }
  };
  const firstFiveScheme = (schemes) => {
    const firstFiveSchemes = schemes.slice(0, 5);
    return firstFiveSchemes;
  };
  const remainingScheme = (schemes) => {
    const remainingSchemes = schemes.slice(5);
    return remainingSchemes;
  };

  useEffect(() => {
    handleSelect();
  }, [handleSelect]);

  const handleFetchTable = useCallback(() => {
    const data = {
      display_location: "TenureAndReturns",
      tag: "TenureAndReturns",
      investor_id: getData("userData")?.investor_id,
      fd_id: fdid,
      payout_method_id: payOutMethod === "" ? "C" : payOutMethod,
    };
    fetchWithWait({ dispatch, action: fetchTableData(data) });
  }, [dispatch, fdid, payOutMethod]);
  useEffect(() => {
    handleFetchTable();
    setPayoutType(
      selectApiResponse.map((el) => {
        return { label: el.item_value, value: el.item_id };
      }),
    );
  }, [handleFetchTable, selectApiResponse]);
  // =========== table =======data=======
  const handleTableData = async (e) => {
    try {
      const { data } = await axios.post(
        `${endpoints?.baseUrl}/products/getfd`,
        {
          display_location: "TenureAndReturns",
          tag: "TenureAndReturns",
          investor_id: getData("userData")?.investor_id,
          fd_id: fdid,
          payout_method_id: payOutMethod === "" ? "C" : payOutMethod,
        },
      );

      console.log("tableData", data?.data);
      setAllTableData(data?.data);

      console.log(firstFiveScheme(data?.data));
      setSlicedTableData(firstFiveScheme(data?.data));

      console.log(remainingScheme(data?.data));
      setRemainingTableData(remainingScheme(data?.data));
      // setTableData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    handleTableData();
  }, []);

  useEffect(() => {
    setActiveRow(slicedTableData?.[0]);
  }, [setActiveRow, slicedTableData]);
  return (
    <>
      {tableApiResponse?.length > 0 && selectApiResponse?.length > 0 ? (
        <div className="   flex w-full max-w-[1008px] flex-col justify-between gap-3 text-[#1B1B1B]  md:gap-5">
          <div id="_header" className="flex justify-between">
            <div id="_left">
              <h3 className="bold-text  text-xl leading-normal  tracking-[-0.3] text-[#1B1B1B]">
                Tenure & Returns
              </h3>
              <p className="text-sm leading-6 tracking-[-0.2] text-[#5E718D]">
                Choose your preferred tenure to invest
              </p>
            </div>
            <div id="_right">
              {payoutType?.length > 0 && !selectApiResponseError && (
                <div className="flex items-center gap-[14px]">
                  <div className="flex items-center gap-[5px] text-sm font-semibold leading-6 tracking-[-0.2px]">
                    <p className="text-sm leading-6 tracking-[-0.2] text-[#5E718D]">
                      Payout Type
                    </p>
                    <img src="/images/info.svg" alt="info-icon" />
                  </div>
                  <Select
                    // placeholder="Select relation with Investor"
                    name="Maturity"
                    defaultValue={payoutType[0]}
                    options={payoutType || []}
                    onChange={(e) => {
                      setPayOutMethod(e?.value);
                      handleTableData();
                    }}
                    styles={selectCustomStyle2}
                    isSearchable={false}
                    isClearable={false}
                  />
                </div>
              )}
            </div>
          </div>
          {/* ============= table  */}
          {!tableApiResponse?.length && !tableApiError ? (
            <Loader />
          ) : (
            <table>
              <thead>
                {/* <tr className="flex w-full justify-between p-5 "> */}
                <tr className="grid w-full grid-cols-3 px-5 ">
                  <th className="medium-text text-start text-sm leading-6 tracking-[-0.2] text-[#5E718D]">
                    Tenure
                  </th>
                  <th className="medium-text text-right text-sm leading-6 tracking-[-0.2] text-[#5E718D]">
                    General
                  </th>
                  <th className="medium-text text-right text-sm leading-6 tracking-[-0.2] text-[#5E718D]">
                    Sr. Citizen
                  </th>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-3">
                {slicedTableData?.map((curVal, index) => {
                  return (
                    <fieldset
                      className={`grid  w-full  grid-cols-3 rounded-2xl  border-[0.5px]  bg-white p-5 text-[#5E718D] ${activeRow?.tenure === curVal?.tenure && "border-[#21B546]"}`}
                      onClick={() => {
                        console.log("tenure", tenure);
                        console.log("cur", curVal);
                        const changeTenure = tenure.filter(
                          (el) => el.value === curVal.tenure,
                        );
                        setSelectedTenure(changeTenure[0]);
                        setActiveRow(curVal);
                      }}
                      key={index}
                    >
                      {index === 0 && (
                        <legend className="medium-text rounded-md bg-[#FFC700] px-2 py-[2px] text-[12px] leading-5 tracking-[-0.2] text-white">
                          Most Invested
                        </legend>
                      )}
                      <td className="regular-text  text-base leading-7 tracking-[-0.3] ">
                        {curVal.tenure}
                      </td>
                      <td
                        className={`semi-bold-text text-right text-base leading-7 tracking-[-0.3]  ${activeRow?.tenure === curVal?.tenure ? "text-[#21B546]" : "text-[#1B1B1B]"}`}
                      >
                        {curVal.rate_of_interest_r}
                      </td>
                      <td
                        className={`semi-bold-text text-right text-base leading-7 tracking-[-0.3]   ${activeRow?.tenure === curVal?.tenure ? "text-[#21B546]" : "text-[#1B1B1B]"}`}
                      >
                        {curVal.rate_of_interest_sc}
                      </td>
                    </fieldset>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <SomethingWentWrong />
      )}
      <SpecialOffers />

      {allTableData.length === 5 || allTableData.length < 5 ? (
        <></>
      ) : (
        <div
          id="_div"
          className="mx-auto -mt-1 flex cursor-pointer items-center gap-2"
          onClick={handleShowAllTenure}
        >
          <span className="medium-text text-sm leading-6 text-[#21B546]">
            Show {showAllData ? "Less" : "All Schemes"}
          </span>
          {showAllData ? (
            <GoChevronUp style={{ color: "#21B546" }} />
          ) : (
            <GoChevronDown style={{ color: "#21B546" }} />
          )}
        </div>
      )}
    </>
  );
};
export default TenureSelection;

// "https://altcaseinvestor.we3.in/api/v1/products/getfd",

// <aside className="relative">
//   <select
//     onChange={(e) => {
//       setPayOutMethod(e.target?.value);
//       handleTableData();
//     }}
//     className=" medium-text medium-text appearance-none rounded-md border bg-[#F0F3F9] py-2 pl-2 pr-9 text-sm  leading-6 tracking-[-0.2] text-[#5E718D] outline-none hover:cursor-pointer"
//   >
//     {selectApiResponse?.map((curData) => {
//       return (
//         <option value={curData?.item_id}>
//           {curData?.item_value}
//         </option>
//       );
//     })}
//   </select>
//   <ChevronNormal />
// </aside>
