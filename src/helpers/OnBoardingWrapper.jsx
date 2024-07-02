const LoginFormWrapper = ({ children, onSubmit }) => {
  return (
    // <div className="m-auto mt-[72px] flex w-full justify-center rounded-md border-2 bg-white md:max-w-[592px] md:rounded-2xl ">
    <div className=" mx-auto mt-8 w-full rounded-md bg-white sm:max-w-[592px] sm:border-[0.5px] md:rounded-2xl">
      <form
        // className="flex h-fit scale-[0.85] flex-col gap-4 px-0 py-[60px] md:scale-100 md:gap-5 md:px-[72px] md:py-[72px] "
        className="flex h-fit  flex-col gap-6  px-6  py-[60px]   md:gap-9 md:px-[72px] md:py-[72px]"
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </div>
  );
};

export default LoginFormWrapper;
