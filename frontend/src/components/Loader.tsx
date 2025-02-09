import React from "react";

const Loader = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex justify-center items-center gap-3 bg-black/40 text-white py-4 rounded-md font-semibold text-center text-xl">
      <span className="loader"></span>{children}
    </div>
  );
};

export default Loader;
