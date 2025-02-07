import { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import Grid from "../components/Grid";
import Button from "../components/Button";
import player1 from "/player1.svg";
import player2 from "/player2.svg";
import useSocket from "../hooks/useSocket";
import { Link } from "react-router-dom";
import { TbReload } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";

interface ResponseProps {
  status: boolean;
  grid: string[];
  sign?: string;
  turn?: string;
  winner?: string;
  message?: string;
}

const Online = () => {
  const [mySign, setMySign] = useState("");
  const [grid, setGrid] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [winner, setWinner] = useState("");
  const count = useRef(0);
  const ws = useSocket();

  const newGameHandler = () => {
    if (!ws) return;

    ws.send(
      JSON.stringify({
        type: "init",
      })
    );
  };

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const data: ResponseProps = JSON.parse(event.data);

      if (data.status) {
        setGrid(data.grid);

        if (data.sign) {
          setMySign(data.sign);
        }

        if (data.winner) {
          setWinner(data.winner);
        }

        if (data.turn) {
          setCurrentPlayer(data.turn);
        }
      } else {
        console.log(data.message);
      }
    };
  }, [ws]);

  return (
    <div className="min-h-screen w-full relative">
      {winner !== "" && (
        <div className="absolute z-20 h-full w-full bg-white/70 flex justify-center items-center text-6xl font-['Array'] font-bold text-center flex-col gap-7">
          {winner} Wins <br /> :)
          <div className="flex gap-4">
            <div className="px-2 py-2 bg-black rounded-md">
              <Link to={"/online"}>
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
          // ref={ImageContainer}
        >
          <img src={player1} alt="player1" className="w-[10rem] " />
          <img src={player2} alt="player2" className="w-[10rem] rotate-y-180" />
        </div>

        <div className="w-full pt-[7.5rem]">
          <Grid
            mySign={mySign}
            ws={ws}
            grid={grid}
            setGrid={setGrid}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            winner={winner}
            count={count}
          />
        </div>

        {ws ? (
          <div className="w-full" onClick={newGameHandler}>
            <Button>New Game</Button>
          </div>
        ) : (
          <div className="w-full">
            <Button>
              <div className="flex justify-center items-center gap-3">
                <span className="loader"></span>Please wait
              </div>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Online;
