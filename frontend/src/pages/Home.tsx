import Button from "../components/Button";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-[url(/grid.png)]">
      <div className="w-full font-['Array-Semibold'] text-[5.5rem] leading-[6rem] text-center pt-[5rem]">
        <h1>
          tic <br /> tac <br /> toe
        </h1>
      </div>

      <Container>
        <p className="font-semibold text-lg underline">Select a mode</p>
        <Link to={"/online"} className="w-full">
          <Button>Play Online</Button>
        </Link>
        <Link to={"/offline"} className="w-full">
          <Button>Play Offline</Button>
        </Link>
      </Container>
    </div>
  );
};

export default Home;
