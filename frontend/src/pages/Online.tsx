import { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import Grid from "../components/Grid";
import Button from "../components/Button";
import player1 from "/player1.svg";
import player2 from "/player2.svg";
import useSocket from "../hooks/useSocket";
import Result from "../components/Result";
import Move from "../components/Move";
import CloseBtn from "../components/CloseBtn";

interface ResponseProps {
  status: boolean;
  grid: string[];
  sign?: string;
  turn?: string;
  winner?: string;
  message?: string;
  moveCount?: number;
}

const Online = () => {
  const ws = useSocket();
  const [mySign, setMySign] = useState("");
  const [grid, setGrid] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [winner, setWinner] = useState("");
  const count = useRef(0);
  const [isConnected, setIsConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const ImageContainer = useRef<null | HTMLDivElement>(null);

  const newGameHandler = () => {
    if (!ws) return;

    setConnecting(true);

    ws.send(
      JSON.stringify({
        type: "init",
      })
    );
  };

  const initGame = () => {
    setGrid(["", "", "", "", "", "", "", "", ""]);
    setWinner("");
    setMySign("");
    setCurrentPlayer("");
    count.current = 0;
  };

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const data: ResponseProps = JSON.parse(event.data);

      if (data.status) {
        setGrid(data.grid);

        if (data.sign) {
          setMySign(data.sign);
          setIsConnected(true);
          setConnecting(false);
        }

        if (data.winner) {
          setWinner(data.winner);
          setIsConnected(false);
        }

        if (data.turn) {
          setCurrentPlayer(data.turn);
        }

        if (data.moveCount) {
          count.current = data.moveCount;
        }
      }
    };
  }, [ws]);

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
        (winner === mySign ? (
          <Result href="online" onClick={initGame}>
            You Win🥳
          </Result>
        ) : winner === "tie" ? (
          <Result href="online" onClick={initGame}>
            It's a tie!😮‍💨
          </Result>
        ) : (
          <Result href="online" onClick={initGame}>
            You Lose😭
          </Result>
        ))}

      <Container>
        <div className="w-full h-full flex justify-center items-center">
          <div
            className="flex absolute z-0 top-0 pt-[3rem] md:gap-[3.5rem]"
            ref={ImageContainer}
          >
            <img src={player1} alt="player1" className="w-[10rem] " />
            <img
              src={player2}
              alt="player2"
              className="w-[10rem] rotate-y-180"
            />
          </div>

          <CloseBtn />

          {!isConnected && (
            <div className="bg-[#EEEEEE]/75 w-full h-full absolute top-0 z-50"></div>
          )}

          <div className="w-full pt-[7.5rem] relative">
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
        </div>

        {ws ? (
          <div className="w-full relative z-[60]">
            {!connecting ? (
              <div onClick={newGameHandler} className="w-ful">
                {!mySign && <Button>New Game</Button>}
              </div>
            ) : (
              <div className="flex justify-center items-center gap-3 bg-black/40 text-white py-4 rounded-md font-semibold text-center text-xl">
                <span className="loader"></span>Finding Player
              </div>
            )}
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

        {winner === "" && count.current < 9 && isConnected && (
          <Move>{currentPlayer === mySign ? "Your" : "Opponent"}</Move>
        )}
      </Container>
    </div>
  );
};

export default Online;
