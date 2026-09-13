import express from "express";

import { authMiddleware } from "../middleware/authMiddleware";
import { saveImageAsset } from "./assetService";

export const assetRoutes = express.Router();

assetRoutes.post(
  "/assets",
  authMiddleware,
  express.raw({
    type: ["image/*", "audio/*", "model/gltf-binary", "application/octet-stream"],
    limit: process.env.ASSET_UPLOAD_LIMIT ?? "24mb",
  }),
  async (request, response) => {
    try {
      if (!Buffer.isBuffer(request.body) || request.body.byteLength === 0) {
        response.status(400).json({
          error: "Arquivo invalido.",
        });
        return;
      }

      const asset = await saveImageAsset({
        buffer: request.body,
        mimeType: request.header("content-type") ?? "application/octet-stream",
        originalName: decodeURIComponent(request.header("x-file-name") ?? ""),
      });

      response.status(201).json({
        ok: true,
        asset,
      });
    } catch (error) {
      response.status(400).json({
          error:
          error instanceof Error ? error.message : "Nao foi possivel salvar o arquivo.",
      });
    }
  },
);
