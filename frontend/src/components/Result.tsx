import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { TbReload } from "react-icons/tb";
import { Link } from "react-router-dom";

const Result = ({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick: () => void;
  href: "online" | "offline";
}) => {
  return (
    <div className="absolute z-[70] h-full w-full bg-white/70 flex justify-center items-center text-6xl font-['Array-Bold'] text-center flex-col gap-7">
      {children}
      <div className="flex gap-4">
        <div className="px-2 py-2 bg-black rounded-md">
          <Link to={`/${href}`} onClick={onClick}>
            <TbReload size={"3rem"} color="white" />
          </Link>
        </div>
        <div className="px-2 py-2 bg-black rounded-md">
          <Link to={"/"}>
            <IoHomeOutline size={"3rem"} color="white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
