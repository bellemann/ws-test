import { WebSocketServer } from "ws";

const port = process.env.PORT || 8080;
const wss = new WebSocketServer({ port });

wss.on("connection", (ws) => {
  ws.on("message", (msg) => ws.send(`Echo: ${msg}`));
});

console.log(`WebSocket server running on port ${port}`);
