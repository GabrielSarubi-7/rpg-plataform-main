import { Router } from "express";

import {
  authMiddleware,
  type AuthenticatedRequest,
} from "../middleware/authMiddleware";

import { getUserById, loginUser, registerUser } from "./authService";

export const authRoutes = Router();

authRoutes.post("/register", async (request, response) => {
  try {
    const result = await registerUser({
      name: String(request.body?.name ?? ""),
      email: String(request.body?.email ?? ""),
      password: String(request.body?.password ?? ""),
    });

    response.status(201).json({
      ok: true,
      ...result,
    });
  } catch (error) {
    response.status(400).json({
      ok: false,
      error: error instanceof Error ? error.message : "Erro ao criar conta.",
    });
  }
});

authRoutes.post("/login", async (request, response) => {
  try {
    const result = await loginUser({
      email: String(request.body?.email ?? ""),
      password: String(request.body?.password ?? ""),
    });

    response.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    response.status(401).json({
      ok: false,
      error: error instanceof Error ? error.message : "Erro ao entrar.",
    });
  }
});

authRoutes.get(
  "/me",
  authMiddleware,
  async (request: AuthenticatedRequest, response) => {
    if (!request.userId) {
      response.status(401).json({
        ok: false,
        error: "Usuário não autenticado.",
      });
      return;
    }

    const user = await getUserById(request.userId);

    if (!user) {
      response.status(404).json({
        ok: false,
        error: "Usuário não encontrado.",
      });
      return;
    }

    response.json({
      ok: true,
      user,
    });
  },
);