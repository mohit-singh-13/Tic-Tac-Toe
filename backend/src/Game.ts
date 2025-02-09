import { WebSocket } from "ws";
import { Payload, Player } from "./GameManager";

export class Game {
  public player1;
  public player2;
  public winner: Player | "tie" | null;

  private winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  private grid = ["", "", "", "", "", "", "", "", ""];
  private moveCount: number;
  private currentTurn: Player;

  constructor(socket1: WebSocket, socket2: WebSocket) {
    this.player1 = socket1;
    this.player2 = socket2;
    this.currentTurn = "O";
    this.winner = null;
    this.moveCount = 0;
    console.log("RESEGIN : ", this.moveCount);
    const randomSign = Math.floor(Math.random() * 10) % 2;

    this.player1.send(
      JSON.stringify({
        sign: randomSign === 0 ? "O" : "X",
        status: true,
        grid: this.grid,
        turn: this.currentTurn,
      })
    );

    this.player2.send(
      JSON.stringify({
        sign: randomSign === 0 ? "X" : "O",
        status: true,
        grid: this.grid,
        turn: this.currentTurn,
      })
    );
  }

  private checkGameOver() {
    this.winningPositions.forEach((winPos) => {
      if (
        (this.grid[winPos[0]] === "X" || this.grid[winPos[0]] === "O") &&
        this.grid[winPos[0]] === this.grid[winPos[1]] &&
        this.grid[winPos[1]] === this.grid[winPos[2]]
      ) {
        this.winner = this.grid[winPos[0]] as Player;
      }
    });

    if (this.moveCount === 9) {
      this.winner = "tie";

      this.player1.send(
        JSON.stringify({
          status: true,
          grid: this.grid,
          winner: "tie",
          moveCount: this.moveCount,
        })
      );

      this.player2.send(
        JSON.stringify({
          status: true,
          grid: this.grid,
          winner: "tie",
          moveCount: this.moveCount,
        })
      );
    }
  }

  private checkValidMove(socket: WebSocket, message: Payload) {
    if (this.moveCount % 2 === 0 && message.player === "X") {
      socket.send(
        JSON.stringify({
          status: false,
          message: "Not your turn",
        })
      );
      return false;
    } else if (this.moveCount % 2 === 1 && message.player === "O") {
      socket.send(
        JSON.stringify({
          status: false,
          message: "Not your turn",
        })
      );
      return false;
    }

    if (this.grid[message.index] !== "") return false;

    return true;
  }

  private respond() {
    if (this.winner) {
      this.player1.send(
        JSON.stringify({
          status: true,
          grid: this.grid,
          winner: this.winner,
          moveCount: this.moveCount,
        })
      );

      this.player2.send(
        JSON.stringify({
          status: true,
          grid: this.grid,
          winner: this.winner,
          moveCount: this.moveCount,
        })
      );
      return;
    } else {
      this.player1.send(
        JSON.stringify({
          status: true,
          grid: this.grid,
          turn: this.currentTurn,
          moveCount: this.moveCount,
        })
      );

      this.player2.send(
        JSON.stringify({
          status: true,
          grid: this.grid,
          turn: this.currentTurn,
          moveCount: this.moveCount,
        })
      );
      return;
    }
  }

  public makeMove(socket: WebSocket, message: Payload) {
    // validating move
    console.log(this.moveCount);
    const isValid = this.checkValidMove(socket, message);
    if (!isValid) return;

    this.grid[message.index] = message.player;
    this.moveCount++;
    this.currentTurn = this.moveCount % 2 === 0 ? "O" : "X";

    // checking if game is over or not
    this.checkGameOver();

    // respond to the users
    this.respond();
  }
}
