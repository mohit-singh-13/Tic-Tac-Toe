import React from "react";

const Move = ({children}:{children: React.ReactNode}) => {
  return (
    <p className="font-['Array-Wide'] text-5xl">
      {children}
      <span className="font-mono text-3xl">'s Move</span>
    </p>
  );
};

export default Move;
