import type { NextFunction, Request, Response } from "express";

import { verifyAuthToken } from "../auth/jwt";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function authMiddleware(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    response.status(401).json({
      ok: false,
      error: "Token ausente.",
    });
    return;
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = verifyAuthToken(token);

    request.userId = payload.userId;

    next();
  } catch {
    response.status(401).json({
      ok: false,
      error: "Token inválido.",
    });
  }
}