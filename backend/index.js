import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import experimentRoutes from "./routes/experimentRoutes.js";
import { WebSocketServer } from "ws";
import { createServer } from "http";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/experiments", experimentRoutes);

const PORT = process.env.PORT || 5001;

const server = createServer(app);
const wss = new WebSocketServer({ server });

// WebSocket: Transmitir mensagens para os clientes
const connectedClients = new Set();

wss.on("connection", (client) => {
  console.log("New client connected via WebSocket");
  connectedClients.add(client);

  client.on("close", () => {
    console.log("Client disconnected");
    connectedClients.delete(client);
  });
});

// Function to send data to all connected clients
const broadcast = (data) => {
  connectedClients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

export { broadcast };
