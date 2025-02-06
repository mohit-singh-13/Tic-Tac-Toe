import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center relative gap-5 pt-[5rem] w-[90%] mx-auto xs:w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%]">
      {children}
    </div>
  );
};

export default Container;
