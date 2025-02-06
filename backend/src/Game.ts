import { WebSocket } from "ws";
import { Payload, Player } from "./GameManager";

export class Game {
  public player1;
  public player2;
  public winner: Player | null;
  
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
  private moveCount = 0;
  private currentTurn: Player;
  
  constructor(socket1: WebSocket, socket2: WebSocket) {
    this.player1 = socket1;
    this.player2 = socket2;
    this.currentTurn = "O";
    this.winner = null;

    this.player1.send(
      JSON.stringify({
        payload: "O",
        status: true,
        grid: this.grid,
        turn: this.currentTurn,
      })
    );

    this.player2.send(
      JSON.stringify({
        payload: "X",
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
      this.player1.send(
        JSON.stringify({
          status: true,
          grid: this.grid,
          winner: "tie",
        })
      );

      this.player2.send(
        JSON.stringify({
          status: true,
          grid: this.grid,
          winner: "tie",
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
        })
      );

      this.player2.send(
        JSON.stringify({
          status: true,
          grid: this.grid,
          winner: this.winner,
        })
      );
      return;
    } else {
      this.player1.send(
        JSON.stringify({
          status: true,
          grid: this.grid,
          currentTurn: this.currentTurn,
        })
      );

      this.player2.send(
        JSON.stringify({
          status: true,
          grid: this.grid,
          currentTurn: this.currentTurn,
        })
      );
      return;
    }
  }

  public makeMove(socket: WebSocket, message: Payload) {
    // validating move
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
