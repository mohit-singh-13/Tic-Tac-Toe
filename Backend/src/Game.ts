import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME } from "./message";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private moveCount: number;
    private winningPos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    private result;

    private gameGrid;
    private ansBox: number[];

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.moveCount = 0;
        this.gameGrid = ["", "", "", "", "", "", "", "", ""];
        this.ansBox = [];
        this.result = false;

        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: "X",
            grid: this.gameGrid
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: "O",
            grid: this.gameGrid
        }))
    }   

    makeMove(socket: WebSocket, move: {
        box: number;
        player: string;
    }) {
        // console.log("MOVE");
        if (this.result) {
            this.player1.send(JSON.stringify({
                status: false
            }));
            this.player2.send(JSON.stringify({
                status: false
            }));
            return;
        }

        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            console.log("early return 1");
            this.player1.send(JSON.stringify({
                status: false
            }))
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            console.log("early return 2");
            this.player2.send(JSON.stringify({
                status: false
            }))
            return;
        }

        this.moveCount++;
        
        this.gameGrid[move.box] = move.player;
        console.log(this.gameGrid);

        const checkGameOver = () => {
            this.winningPos.forEach((pos) => {
                if (this.gameGrid[pos[0]] !== "" && this.gameGrid[pos[1]] !== "" && this.gameGrid[pos[2]] !== "") {
                    if (this.gameGrid[pos[0]] === this.gameGrid[pos[1]] && this.gameGrid[pos[0]] == this.gameGrid[pos[2]]) {
                        this.ansBox = pos;
                        this.result = true;
    
                        if (this.gameGrid[pos[0]] == "X") {
                            this.player1.send(JSON.stringify({
                                type: GAME_OVER,
                                payload: "You Win 🥳",
                                ansBox: this.ansBox
                            }))
                            this.player2.send(JSON.stringify({
                                type: GAME_OVER,
                                payload: "You Lose 😭",
                                ansBox: this.ansBox
                            }));
                        } else {
                            console.log("O is winner");
                            this.player1.send(JSON.stringify({
                                type: GAME_OVER,
                                payload: "You Lose 😭",
                                ansBox: this.ansBox
                            }));
                            this.player2.send(JSON.stringify({
                                type: GAME_OVER,
                                payload: "You Win 🥳",
                                ansBox: this.ansBox
                            }))
                        }

                        return;
                    }
                }
            })

            let filledCount = 0;
            this.gameGrid.forEach(box => {
                if (box !== "") {
                    filledCount++;
                }
            });

            if (filledCount === 9) {
                this.result = true;

                this.player1.send(JSON.stringify({
                    type: GAME_OVER,
                    payload: "It's a tie 😮‍💨",
                    grid: this.gameGrid
                }));
                this.player2.send(JSON.stringify({
                    type: GAME_OVER,
                    payload: "It's a tie 😮‍💨",
                    grid: this.gameGrid
                }));

                return;
            }

        }

        checkGameOver();

        this.player1.send(JSON.stringify({
            type: "continue",
            payload: "X",
            grid: this.gameGrid,
            status: true
        }));
        this.player2.send(JSON.stringify({
            type: "continue",
            payload: "O",
            grid: this.gameGrid,
            status: true
        }));
    }
}