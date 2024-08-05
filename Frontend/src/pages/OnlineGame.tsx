import { useEffect, useState } from "react"
import useSocket from "../hooks/useSocket";
import Box from "../components/Box";

const OnlineGame = () => {
    const socket = useSocket();

    const [mySign, setMySign] = useState<string>("?");
    const [grid, setGrid] = useState<string[]>(["", "", "", "", "", "", "", "", ""]);
    const [winner, setWinner] = useState<string>("");
    const flag = true;
    const [ansBox, setAnsBox] = useState<number[] | null>([]);

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMySign(data.payload);
            setGrid(data.grid);
        }
    }, [socket]);

    return (
        <div>
            <div className="h-screen w-screen bg-bg-image bg-cover bg-center flex justify-center">
                <div className="w-[360px] space-y-24 pt-[2.5rem]">
                    <div className="mx-auto w-[80%] border-border-glass bg-bg-glass rounded-2xl px-10 py-[0.4rem] text-center text-[1.2rem] font-serif text-white">
                    {
                        winner === "" ? `You are - ${mySign}` : winner
                    }    
                    </div>

                    <button className="px-4 py-2 bg-white"
                    onClick={() => {
                        socket?.send(JSON.stringify({
                            type: "init_game"
                        }))
                    }}>
                        Play
                    </button>

                    <div className="grid grid-cols-3 bg-bg-glass rounded-2xl py-8 px-4">
                    {
                        grid.map((box, index) => {
                            // @ts-expect-error temporary ignoring the cause
                            return <Box key={index} box={box} index={index} setGrid={setGrid} flag={flag} currentPlayer={mySign} gameType={1} socket={socket} setWinner={setWinner} ansBox={ansBox} setAnsBox={setAnsBox} />
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnlineGame