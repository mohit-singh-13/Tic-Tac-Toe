import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
import { config } from "dotenv";

config();
const PORT = Number(process.env.PORT);

const wss = new WebSocketServer({ port: PORT });

const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
  ws.on("error", function error(err) {
    console.log("Error while connecting to WebSocket server :", err.message);
    return;
  });

  gameManager.addUser(ws);

  ws.on("close", function close() {
    gameManager.removeUser(this);
  });
});
