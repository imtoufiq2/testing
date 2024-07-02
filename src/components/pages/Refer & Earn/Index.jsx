import React, { useEffect } from "react";
import FooterSection from "../../organism/footerSection";

const ReferAndEarn = () => {
  //auto scroll
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const data = [
    {
      title: "copy",
      url: "/images/Copy.svg",
    },
    {
      title: "watsapp",
      url: "/images/WhatsappLogo.svg",
    },
    {
      title: "chat",
      url: "/images/ChatText.svg",
    },
    {
      title: "email",
      url: "/images/green-envelope.svg",
    },
  ];

  const rightData = [
    {
      value: "₹800",
      tag: "Earned",
    },
    {
      value: "25",
      tag: "Registered",
    },
    {
      value: "10",
      tag: "Invested",
    },
  ];

  const earningInfo = [
    {
      name: "Amita Jain",
      avatar: "",
      date: "12 Mar 2024",
      time: "10:20 AM",
      price: "100",
    },
    {
      name: "Sanchit Kulkarni",
      avatar: "",
      date: "10 Mar 2024",
      time: "07:35 PM",
      price: "300",
    },
    {
      name: "Zaheer Sheikh",
      avatar: "",
      date: "7 Mar 2024",
      time: "02:14 PM",
      price: "250",
    },
    {
      name: "Monika Rawat",
      avatar: "",
      date: "2 Mar 2024",
      time: "04:53 PM",
      price: "100",
    },
    {
      name: "Akriti Shahleza",
      avatar: "",
      date: "24 Feb 2024",
      time: "06:27 PM",
      price: "50",
    },
  ];
  useEffect(() => {
    document.body.style.backgroundColor = "#F9FAFB";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // const handleIconClick = (title) => {
  //   const referralLink = "https://altcase.com/invite/SM26JK";

  //   if (title === "copy") {
  //     navigator.clipboard
  //       .writeText(referralLink)
  //       .then(() => {
  //         alert("Link copied to clipboard!");
  //       })
  //       .catch((err) => {
  //         console.error("Failed to copy: ", err);
  //       });
  //   } else if (title === "whatsapp") {
  //     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(referralLink)}`;
  //     window.open(whatsappUrl, "_blank");
  //   } else if (title === "chat") {
  //     const smsUrl = `sms:?body=${encodeURIComponent(referralLink)}`;
  //     window.open(smsUrl, "_blank");
  //   } else if (title === "email") {
  //     const emailUrl = `mailto:?subject=Check this out&body=${encodeURIComponent(referralLink)}`;
  //     window.open(emailUrl, "_blank");
  //   }
  // };
  const handleIconClick = (title) => {
    const referralLink = "https://altcase.com/invite/SM26JK";
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    console.log("ismobile", isMobile);
    if (title === "copy") {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else if (title === "whatsapp") {
      const whatsappUrl = isMobile
        ? `whatsapp://send?text=${encodeURIComponent(referralLink)}`
        : `https://web.whatsapp.com/send?text=${encodeURIComponent(referralLink)}`;
      window.open(whatsappUrl, "_blank");
    } else if (title === "chat" && isMobile) {
      const smsUrl = `sms:?body=${encodeURIComponent(referralLink)}`;
      if (isMobile) {
        window.location.href = smsUrl;
      } else {
        window.open(smsUrl, "_blank");
      }
    } else if (title === "email") {
      const emailUrl = `mailto:?subject=Check this out&body=${encodeURIComponent(referralLink)}`;
      window.open(emailUrl, "_blank");
    }
  };
  return (
    //use the home screen banner here also as reusable components because here also we have to do the same with the background color

    <div>
      <div id="_header" className=" bg-[#02542B] ">
        <div
          id="_inner-box"
          className="mx-auto grid  w-[90%] max-w-[1008px] grid-cols-1  lg:min-h-[358px] lg:grid-cols-2 lg:gap-4"
        >
          <div
            id="_left"
            className="relative mt-5 flex flex-col text-white lg:top-[33%] lg:mt-0 lg:gap-6 lg:pb-[1.8rem]"
          >
            <h3 className="bold-text text-center text-[1.75rem] leading-9 tracking-[-0.5] lg:text-start lg:text-5xl lg:leading-[3.5rem] lg:tracking-[-1.75]	">
              Refer & Earn
            </h3>
            <p className="regular-text hidden text-xl leading-[30px] tracking-[-0.3] lg:block">
              Share your referral link with your friends to invite them to
              Altcase and earn rewards when they invest.
            </p>
          </div>
          <div
            id="_right"
            className="relative"
            // className="lg:min-h-[20.5rem]"
          >
            <img
              src="/images/refer-and-earn.svg"
              alt="refer"
              className="  absolute  bottom-0   hidden w-full object-cover lg:-right-[88px] lg:mt-5 lg:block"
            />
            <img
              src="/images/Frame.svg"
              alt="refer"
              className="mx-auto mb-[40px] h-[10.125rem] max-w-[19.375rem] lg:hidden"
            />
          </div>
        </div>
      </div>

      <div
        id="_translateY"
        className="-mb-5 flex -translate-y-11 flex-col  gap-3 md:mb-0 lg:-translate-y-9 lg:gap-8"
      >
        <div
          id="_second_part"
          className=" mx-auto  grid w-[90%]  max-w-[1008px]  grid-cols-1 gap-3 text-[#1B1B1B] md:w-[75%] md:gap-6 lg:grid-cols-custom  lg:gap-8"
        >
          <div
            id="_left"
            className="flex h-fit flex-col gap-4 rounded-2xl border-[0.5px] bg-white p-5 md:p-8 lg:min-w-full lg:max-w-[592px] lg:gap-8"
          >
            <div
              id="_first"
              className="bold-text mt-1 text-xl leading-8 tracking-[-0.3] md:leading-[2.1875rem] lg:mt-0"
            >
              Invite your friends and earn 🎁 rewards
            </div>
            <div
              id="_second"
              className="regular-text mb-1 text-sm leading-6 tracking-[-0.2] text-slate-500 lg:hidden"
            >
              Share your referral link with your friends to invite them to
              Altcase and earn rewards when they invest.
            </div>
            <div id="_third" className="flex flex-col gap-1">
              <p className="medium-text text-sm leading-6 tracking-[-0.2] text-slate-500 md:text-base md:leading-7 md:tracking-[-0.3]">
                Share your referral link
              </p>
              <h5 className="semi-bold-text text-sm leading-6  tracking-[-0.2] text-[#21B546] md:text-xl md:leading-8 md:tracking-[-0.3]">
                altcase.com/invite/SM26JK
              </h5>
            </div>
            <div id="_fourth" className="flex items-center gap-3">
              {data?.map((cur) => {
                return (
                  <button
                    className="rounded-md bg-[#F2FFF5] p-4 "
                    onClick={() => handleIconClick(cur.title)}
                  >
                    <img
                      src={cur?.url}
                      alt={cur.title}
                      className="h-[1.125rem] w-[1.125rem] "
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div
            id="_right"
            className="flex h-fit flex-col gap-5 rounded-2xl border-[0.5px] bg-white p-5 md:p-8 lg:gap-8"
          >
            <div
              id="_top"
              className="bold-text text-xl leading-8 tracking-[-0.3]"
            >
              Invite Report
            </div>
            <div className="flex items-center gap-[0.875rem]">
              {rightData?.map((cur) => {
                return (
                  <div className="flex min-w-[5.25rem] flex-col rounded-xl border-[0.5px] bg-[#F0F3F9] py-5 ">
                    <h3
                      id="_top"
                      className="semi-bold-text text-center text-base leading-7 tracking-[-0.3] text-[#1B1B1B]"
                    >
                      {cur?.value}
                    </h3>
                    <p
                      id="_bottm"
                      className="regular-text text-center text-xs leading-5 tracking-[-0.2] text-[#5E718D]"
                    >
                      {cur?.tag}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          id="_third_part"
          className=" mx-auto  grid w-[90%]  max-w-[1008px]  grid-cols-1 gap-3 text-[#1B1B1B] md:w-[75%] md:gap-6 lg:grid-cols-custom  lg:gap-8"
        >
          <div
            id="_left"
            className="flex h-fit flex-col gap-4 rounded-2xl border-[0.5px] bg-white p-5 md:p-8 lg:min-w-full lg:max-w-[592px] lg:gap-8"
          >
            <h3
              id="_top"
              className="bold-text text-xl leading-8 tracking-[-0.3] text-[#1B1B1B]"
            >
              Earning Activities
            </h3>
            <div id="_users" className=" flex flex-col gap-4">
              {earningInfo?.map((cur) => {
                return (
                  <div className="flex items-center justify-between gap-3">
                    <img
                      src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />

                    <div id="_middle" className="flex flex-1 flex-col ">
                      <h6 className="medium-text text-sm leading-6 tracking-[-0.2] text-[#1B1B1B]">
                        {cur?.name}
                      </h6>
                      <p className="regular-text text-xs leading-5 tracking-[-0.2] text-[#5E718D]">
                        {cur.date} • {cur.time}
                      </p>
                    </div>
                    <div id="_right" className="regular-text text-right">
                      ₹
                      <span className="semi-bold-text text-base leading-7 tracking-[-0.3]">
                        {cur.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" md:w-[346px]"></div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default ReferAndEarn;
