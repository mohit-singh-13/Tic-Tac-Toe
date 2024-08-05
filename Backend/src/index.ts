import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
import { config } from "dotenv";

config();
const PORT = Number(process.env.PORT);

const wss = new WebSocketServer({port: PORT});

const gameManager = new GameManager();

wss.on("connection", (ws) => {
    gameManager.addUser(ws);

    ws.on("close", () => {
        console.log("Connection closed");
        gameManager.removeUser(ws);
    })
})