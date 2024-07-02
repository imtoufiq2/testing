import { useEffect, useRef, useState } from "react";
import AssistanceContainer from "../assistanceContainer";
import ProfileCard from "../profileCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const CustomerTestimonials = ({ testimonials }) => {
  const containerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      handleScroll(); // Initial check
      currentContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <AssistanceContainer className="   flex-col gap-5 md:gap-10 ">
      <div id="top" className="  ">
        <h2 className="bold-text text-xl leading-8 tracking-[-0.3]   md:hidden">
          People{" "}
          <span className="bold-text text-custom-green md:font-bold">love</span>{" "}
          ❤️{" "}
          <span className="bold-text text-custom-green md:font-bold">
            investing
          </span>{" "}
          <span className="block">in FDs with us</span>
        </h2>

        <h2 className="medium-text hidden text-4xl leading-[44px] md:block md:tracking-[-1]">
          People{" "}
          <span className="bold-text text-custom-green md:font-bold">love</span>{" "}
          ❤️{" "}
          <span className="bold-text text-custom-green md:font-bold">
            investing
          </span>{" "}
          <span className="block">in FDs with us</span>
        </h2>
      </div>
      <div className="relative">
        {testimonials?.length > 3 && (
          <span
            className={`text-red-950d- absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-2/4 -translate-y-1/2 transform  items-center justify-center rounded-full border-[0.5px] border-[#D7DFE9]  p-2 lg:flex  ${
              isAtStart
                ? " bg-[#F9FAFB] text-[#D7DFE9] opacity-50"
                : "cursor-pointer bg-[#F2FFF5] text-[#5E718D]"
            }`}
            onClick={scrollLeft}
            disabled={isAtStart}
          >
            <HiChevronLeft />
          </span>
        )}

        <div
          id="bottom"
          ref={containerRef}
          className="example flex w-full gap-3  overflow-x-scroll sm:gap-6 md:gap-11"
        >
          {testimonials?.map((testimonial) => {
            return (
              <ProfileCard
                name={testimonial.name}
                city={testimonial.city}
                comment={testimonial.comment}
                user_logo={testimonial.user_logo}
                color_code={testimonial.color_code}
              />
            );
          })}
          {testimonials?.length > 3 && (
            <span
              className={`absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 translate-x-2/4 transform  items-center justify-center rounded-full p-2 text-[#5E718D] lg:flex  ${
                isAtEnd
                  ? " bg-[#F9FAFB] text-[#D7DFE9] opacity-50"
                  : "cursor-pointer bg-[#F2FFF5] text-[#5E718D]"
              }`}
              onClick={scrollRight}
              disabled={isAtEnd}
            >
              <HiChevronRight />
            </span>
          )}
        </div>
      </div>
    </AssistanceContainer>
  );
};

export default CustomerTestimonials;
