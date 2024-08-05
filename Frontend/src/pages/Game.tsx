import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "../components/Box";

const Game = ({ gameType }: 
{ 
    gameType: number | null
}) => {
    console.log("Game");

    const winningPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const navigate = useNavigate();

    const Players: any = {
        0: "X",
        1: "O"
    }
    
    const [currentPlayer, setCurrentPlayer] = useState<string>(Players[Math.floor(Math.random() * 2)]);
    const [grid, setGrid] = useState<string[]>(["", "", "", "", "", "", "", "", ""]);

    const initGame = () => {
        setCurrentPlayer(Players[Math.floor(Math.random() * 2)]);
        setGrid(["", "", "", "", "", "", "", "", ""]);
        const element = document.getElementsByClassName("my-box");
        
        for (let i=0 ; i<element.length ; i++) {
            // @ts-expect-error temporary ignoring the cause
            element[i].innerText = "";
        }
    }

    useEffect(() => {
        if (gameType === null) {
            navigate("/");
            return;
        }

        initGame();
    }, []);
    
    let flag = true;
    let ansBox: number[] | null = [];
    let gameOver = false;

    let answer = "";

    const checkGameOver = () => {
        winningPositions.forEach((pos) => {
            if (grid[pos[0]] !== "" && grid[pos[1]] !== "" && grid[pos[2]] !== "") {
                if (grid[pos[0]] === grid[pos[1]] && grid[pos[0]] == grid[pos[2]]) {
                    ansBox = pos;

                    if (grid[pos[0]] == "X") {
                        answer = "X";
                    } else {
                        answer = "O";
                    }
                    flag = false;
                    gameOver = true;
                }
            }
        })

        let filledCount = 0;
        grid.forEach(box => {
            if (box !== "") {
                filledCount++;
            }
        });
        
        if (flag) {
            if (filledCount === 9) {
                gameOver = true;
                flag = false;
                answer = "tie";
            }
        }
    }

    checkGameOver();

    return (
        <div className="h-screen w-screen bg-bg-image bg-cover bg-center flex justify-center">
            <div className="w-[360px] space-y-24 pt-[2.5rem]">
                <div className="mx-auto w-[80%] border-border-glass bg-bg-glass rounded-2xl px-10 py-[0.4rem] text-center text-[1.2rem] font-serif text-white">
                {
                    !gameOver && 
                    `Current Player - ${currentPlayer}`
                }
                {
                    gameOver &&
                    (answer === "tie" ? "It's a Tie!" : `Winner - ${answer}`)
                }
                </div>

                <div className="grid grid-cols-3 bg-bg-glass rounded-2xl py-8 px-4">
                {
                    grid.map((box, index) => {
                        // @ts-expect-error temporary ignoring the cause
                        return <Box box={box} setGrid={setGrid} index={index} key={index} gameType={gameType} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} flag={flag} ansBox={ansBox} />
                    })
                }
                </div>

                {
                    gameOver && 
                    <div className="mx-auto w-[80%] border-border-glass bg-bg-glass rounded-2xl px-10 py-[0.4rem] text-center text-[1.2rem] font-serif text-white cursor-pointer"
                    onClick={initGame}>
                        New Game
                    </div>
                }
            </div>
        </div>
    )
}

export default Game