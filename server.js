import { WebSocketServer } from "ws";

const port = process.env.PORT || 8080;
const wss = new WebSocketServer({ port });

const channels = new Map();

wss.on("connection", (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathParts = url.pathname.split("/").filter(Boolean);

  if (pathParts[0] !== "chat" || !pathParts[1]) {
    ws.close(1008, "Invalid channel path");
    return;
  }

  const channelId = pathParts[1];

  if (!channels.has(channelId)) {
    channels.set(channelId, new Set());
  }

  channels.get(channelId).add(ws);

  ws.on("message", (msg) => {
    const channel = channels.get(channelId);
    channel.forEach((client) => {
      if (client.readyState === 1) {
        client.send(`ping: ${msg}`);
      }
    });
  });

  ws.on("close", () => {
    channels.get(channelId).delete(ws);
    if (channels.get(channelId).size === 0) {
      channels.delete(channelId);
    }
  });
});

console.log(`WebSocket server running on port ${port}`);
