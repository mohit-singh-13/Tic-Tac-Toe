import { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import Grid from "../components/Grid";
import player1 from "/player1.svg";
import player2 from "/player2.svg";
import Move from "../components/Move";
import Result from "../components/Result";
import CloseBtn from "../components/CloseBtn";

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
    if (count.current === 9) {
      setWinner("tie");
    }

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
      {winner !== "" &&
        (winner === "tie" ? (
          <Result href="offline" onClick={initGame}>
            It's a tie!😮‍💨
          </Result>
        ) : (
          <Result href="offline" onClick={initGame}>
            {winner} Wins🥳
          </Result>
        ))}

      <Container>
        <div
          className="flex absolute z-0 top-0 pt-[3rem] md:gap-[3.5rem]"
          ref={ImageContainer}
        >
          <img src={player1} alt="player1" className="w-[10rem] " />
          <img src={player2} alt="player2" className="w-[10rem] rotate-y-180" />
        </div>

        <CloseBtn />

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

        {winner === "" && count.current < 9 && <Move>{currentPlayer}</Move>}
      </Container>
    </div>
  );
};

export default Offline;
