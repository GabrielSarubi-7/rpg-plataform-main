import "dotenv/config";

import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import { assetRoutes } from "./assets/assetRoutes";
import { getAssetRoot } from "./assets/assetService";
import { authRoutes } from "./auth/authRoutes";
import { campaignRoutes } from "./campaigns/campaignRoutes";
import { mapRoutes } from "./maps/mapRoutes";
import { characterRoutes } from "./characters/characterRoutes";
import { registerLiveSocketHandlers } from "./live/liveSocketHandlers";

const PORT = Number(process.env.PORT ?? 3001);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);

app.use(
  "/assets",
  express.static(getAssetRoot(), {
    immutable: true,
    maxAge: "365d",
  }),
);

app.use(assetRoutes);
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT ?? "6mb" }));

app.get("/health", (_request, response) => {
  response.json({
    ok: true,
    service: "rpg-platform-server",
  });
});

app.use("/auth", authRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/", mapRoutes);
app.use("/", characterRoutes);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  maxHttpBufferSize: Number(
    process.env.SOCKET_MAX_BUFFER_BYTES ?? 6 * 1024 * 1024,
  ),
  cors: {
    origin: CLIENT_ORIGIN,
  },
});

io.on("connection", (socket) => {
  registerLiveSocketHandlers(io, socket);
});

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
