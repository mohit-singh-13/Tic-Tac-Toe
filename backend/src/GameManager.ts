import { WebSocket } from "ws";
import { Game } from "./Game";

type MessageType = "init" | "move";

export type Player = "O" | "X";

export interface Payload {
  index: number;
  player: Player;
}

export interface Message {
  type: MessageType;
  payload: Payload;
}

export class GameManager {
  private users: WebSocket[];
  private pendingUser: WebSocket | null;
  private games: Game[];

  constructor() {
    this.users = [];
    this.pendingUser = null;
    this.games = [];
  }

  public addUser(socket: WebSocket) {
    this.users.push(socket);
    this.connectionHandler(socket);
  }

  public removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
    // this.pendingUser = null;
    if (socket === this.pendingUser) {
      this.pendingUser = null;
      console.log("CLESR")
    }
  }

  private connectionHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      // console.log(this.pendingUser?.OPEN)
      const message: Message = JSON.parse(data.toString());
      console.log(message);

      if (message.type === "init") {
        if (this.pendingUser) {
          // creating new game
          console.log("NEW GAME");
          const game = new Game(this.pendingUser, socket);

          // pushing the game to games[]
          this.games.push(game);
          this.pendingUser = null;
        } else {
          // setting pending user since there was none
          this.pendingUser = socket;
        }
      } else if (message.type === "move") {
        // finding the game
        const game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );

        if (game) {
          game.makeMove(socket, message.payload);
        }

        if (game?.winner) {
          this.games = this.games.filter(
            (game) => game.player1 !== socket && game.player2 !== socket
          );
        }
      }
    });
  }
}
