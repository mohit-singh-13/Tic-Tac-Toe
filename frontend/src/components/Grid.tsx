import { ReactNode } from "react";

const GridBox = ({
  ws,
  mySign,
  children,
  index,
  grid,
  setGrid,
  currentPlayer,
  setCurrentPlayer,
  winner,
  count,
}: { children: ReactNode; index: number } & GridProps) => {
  const swapTurn = () => {
    if (currentPlayer === "X") setCurrentPlayer("O");
    else setCurrentPlayer("X");
  };

  const clickHandler = () => {
    if (winner !== "") return;

    if (grid[index] !== "") return;

    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[index] = currentPlayer;
      return newGrid;
    });

    count.current++;

    swapTurn();
  };

  const wsClickHandler = () => {
    if (!ws) return;

    ws.send(
      JSON.stringify({
        type: "move",
        payload: {
          index,
          player: mySign,
        },
      })
    );
  };

  const color = children === "X" ? "text-[#D65A31]" : "text-[#4F98CA]";

  return (
    <div
      className={`h-[6rem] sm:h-[7rem] md:h-[8rem] flex justify-center items-center border-2 w-full text-6xl md:text-7xl lg:text-8xl cursor-pointer font-['Array'] border-black ${color}`}
      onClick={ws ? wsClickHandler : clickHandler}
    >
      {children}
    </div>
  );
};

const Grid = ({
  ws,
  mySign,
  grid,
  setGrid,
  currentPlayer,
  setCurrentPlayer,
  winner,
  count,
}: GridProps) => {
  return (
    <div className="w-full h-full relative z-10">
      <div className="grid grid-cols-3 w-full bg-white">
        {grid.map((box, index) => (
          <GridBox
            key={index}
            ws={ws}
            mySign={mySign}
            index={index}
            grid={grid}
            setGrid={setGrid}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            winner={winner}
            count={count}
          >
            {box}
          </GridBox>
        ))}
      </div>
    </div>
  );
};

export default Grid;
