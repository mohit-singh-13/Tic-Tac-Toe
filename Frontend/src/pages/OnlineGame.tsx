import { useEffect, useState } from "react"
import useSocket from "../hooks/useSocket";
import Box from "../components/Box";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const OnlineGame = ({ gameType } : {
    gameType: number | null;
}) => {
    const socket = useSocket();

    const [mySign, setMySign] = useState<string>("?");
    const [grid, setGrid] = useState<string[]>(["", "", "", "", "", "", "", "", ""]);
    const [winner, setWinner] = useState<string>("");
    const flag = true;
    const [ansBox, setAnsBox] = useState<number[] | null>([]);
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (gameType === null) {
            navigate("/");
            return;
        }

        if (!socket) return;

        socket.onmessage = (event) => {
            setSpinner(false);

            const data = JSON.parse(event.data);
            setMySign(data.payload);
            setGrid(data.grid);
        }
    }, [socket, gameType, navigate]);

    return (
        <div>
            <div className="h-screen w-screen bg-bg-image bg-cover bg-center flex justify-center">
                <div className="w-[360px] pt-[2.5rem]">
                {
                    spinner && 
                    <div className="h-[80%]">

                        <div className="flex justify-center items-center h-full">
                            <Spinner />
                        </div>
                    </div>
                }
                {
                    !spinner &&
                    <div className="space-y-10">
                        <div className="mx-auto w-[80%] border-border-glass bg-bg-glass rounded-2xl px-10 py-[0.4rem] text-center text-[1.2rem] font-serif text-white">
                        {
                            winner === "" ? `You are - ${mySign}` : winner
                        }    
                        </div>
                        
                        <div className="mx-auto w-[80%] border-border-glass bg-bg-glass rounded-2xl px-10 py-[0.4rem] text-center text-[1.2rem] font-serif text-white cursor-pointer"
                        onClick={() => {
                            setSpinner(true)
                        
                            socket?.send(JSON.stringify({
                                type: "init_game"
                            }))
                        }}>
                            New Game
                        </div>

                        <div className="grid grid-cols-3 bg-bg-glass rounded-2xl py-8 px-4">
                        {
                            grid.map((box, index) => {
                                // @ts-expect-error temporarily ignoring the cause
                                return <Box key={index} box={box} index={index} setGrid={setGrid} flag={flag} currentPlayer={mySign} gameType={gameType} socket={socket} setWinner={setWinner} ansBox={ansBox} setAnsBox={setAnsBox} setMySign={setMySign} setSpinner={setSpinner} />
                            })
                        }
                        </div>
                    </div>
                }
                    
                </div>
            </div>
        </div>
    )
}

export default OnlineGame