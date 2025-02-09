import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const CloseBtn = () => {
  return (
    <div className="absolute z-[80] top-2 left-0 px-2 md:left-[-2rem] py-2 bg-black">
      <Link to={"/"}>
        <IoClose color="white" />
      </Link>
    </div>
  );
};

export default CloseBtn;
