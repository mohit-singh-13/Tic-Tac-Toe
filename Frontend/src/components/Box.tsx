const Box = ({ index, currentPlayer, setCurrentPlayer, setGrid, flag, ansBox, gameType, socket, box, setWinner, setAnsBox }: 
{
    index: number, 
    currentPlayer: string, 
    setCurrentPlayer: (player: string) => void,
    setGrid: (grid: (prevGrid: string[]) => string[]) => void,
    flag: boolean,
    ansBox: number[] | null,
    gameType: number | null,
    socket: WebSocket | null,
    box: string,
    setWinner: (data: string) => void,
    setAnsBox: (data: number[]) => void
}) => {
    const swapTurn = () => {
        if (currentPlayer === "X") {
            setCurrentPlayer("O");
        } else {
            setCurrentPlayer("X");
        }
    }

    const clickHandler = (event: any) => {
        if (gameType === 1) {
            socket?.send(JSON.stringify ({
                type: "move",
                move: {
                    box: index,
                    player: currentPlayer
                }
            }));

            socket.onmessage = (event1) => {
                const data = JSON.parse(event1.data);
                
                if (data.status) {
                    event.target.innerText = currentPlayer;
            
                    setGrid(data.grid);
                }

                if (data.type === "game_over") {
                    setWinner(data.payload);

                    if(data?.ansBox) {
                        ansBox = data.ansBox;
                        setAnsBox(data.ansBox);
                    }
                }
            }

        } else if (event.target.innerText === "") {
            event.target.innerText = currentPlayer;
            
            setGrid((prevGrid: string[]) => {
                const newGrid = [...prevGrid];
                newGrid[index] = currentPlayer;
                return newGrid;
            });
            
            event.target.className += " cursor-not-allowed ";
            const temp = event.target.className.split(" ");
            temp.splice(temp.indexOf("cursor-pointer"), 1);
            event.target.className = temp.join(" ");

            swapTurn();
        }
    }

    let winClass = "";
    if (index === ansBox?.find(num => num === index)) {
        winClass = "bg-green-600";
    }

    let borderClass = "";
    if (index === 0 || index === 1 || index === 3 || index === 4 || index === 6 || index === 7) {
        borderClass += "border-r-2 ";
    }
    if (index === 1 || index === 2 || index === 4 || index === 5 || index === 7 || index === 8) {
        borderClass += "border-l-2 ";
    }
    if (index === 3 || index === 4 || index === 5 || index === 6 || index === 7 || index === 8) {
        borderClass += "border-t-2 ";
    }
    if (index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5) {
        borderClass += "border-b-2 ";
    }

    return (
        <div className="h-[5.5rem]">
            <div className={`h-full w-full ${!flag ? `cursor-default pointer-events-none` : `cursor-pointer`} ${winClass} transition-all duration-300 ${borderClass} flex justify-center items-center text-5xl text-white font-serif my-box`} onClick={clickHandler}>
            {
                box
            }
            </div>
        </div>
    );
}

export default Box