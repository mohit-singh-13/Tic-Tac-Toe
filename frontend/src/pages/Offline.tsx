import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import Grid from "../components/Grid";
import { TbReload } from "react-icons/tb";
import { IoClose, IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import player1 from "/player1.svg";
import player2 from "/player2.svg";

const Offline = () => {
  const [grid, setGrid] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState("");
  const ImageContainer = useRef<null | HTMLDivElement>(null);

  const count = useRef(0);

  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const initGame = () => {
    setGrid(["", "", "", "", "", "", "", "", ""]);
    setWinner("");
    count.current = 0;
  };

  useEffect(() => {
    winningPositions.forEach((winPos) => {
      if (
        (grid[winPos[0]] === "X" || grid[winPos[0]] === "O") &&
        grid[winPos[0]] === grid[winPos[1]] &&
        grid[winPos[1]] === grid[winPos[2]]
      ) {
        setWinner(grid[winPos[0]]);
      }
    });
  }, [grid]);

  useEffect(() => {
    const container = ImageContainer.current;

    if (container) {
      const img1 = container.children[0];
      const img2 = container.children[1];

      if (currentPlayer === "O") {
        img2.classList.add("opacity-[50%]");
        img1.classList.remove("opacity-[50%]");
      } else {
        img1.classList.add("opacity-[50%]");
        img2.classList.remove("opacity-[50%]");
      }
    }
  }, [currentPlayer]);

  return (
    <div className="min-h-screen w-full relative">
      {winner !== "" && (
        <div className="absolute z-20 h-full w-full bg-white/70 flex justify-center items-center text-6xl font-['Array'] font-bold text-center flex-col gap-7">
          {winner} Wins <br /> :)
          <div className="flex gap-4">
            <div className="px-2 py-2 bg-black rounded-md" onClick={initGame}>
              <Link to={"/offline"}>
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
      )}

      <Container>
        <div
          className="flex absolute z-0 top-0 pt-[3rem] md:gap-[3.5rem]"
          ref={ImageContainer}
        >
          <img src={player1} alt="player1" className="w-[10rem] " />
          <img src={player2} alt="player2" className="w-[10rem] rotate-y-180" />
        </div>

        <div className="absolute top-2 left-0 px-2 md:left-[-2rem] py-2 bg-black">
          <Link to={"/"}>
            <IoClose color="white" />
          </Link>
        </div>

        <div className="w-full pt-[7.5rem]">
          <Grid
            grid={grid}
            setGrid={setGrid}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            winner={winner}
            count={count}
          />
        </div>

        {count.current === 9 && winner === "" && (
          <div onClick={initGame} className="w-full">
            <Button>New Game</Button>
          </div>
        )}

        {winner === "" && count.current < 9 && (
          <p className="font-['Array'] text-5xl">
            {currentPlayer}
            <span className="font-mono text-3xl">'s Move</span>
          </p>
        )}
      </Container>
    </div>
  );
};

export default Offline;
