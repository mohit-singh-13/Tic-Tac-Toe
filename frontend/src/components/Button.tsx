import { ReactNode } from "react";

const Button = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-2 rounded-lg w-full text-center py-4 text-xl font-semibold bg-black hover:bg-[#2c2a2a] cursor-pointer text-white hover:scale-105 transition">
      {children}
    </div>
  );
};

export default Button;
