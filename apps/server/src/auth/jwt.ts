import jwt from "jsonwebtoken";

export interface AuthTokenPayload {
  userId: string;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não definido no .env");
  }

  return secret;
}

function isAuthTokenPayload(payload: unknown): payload is AuthTokenPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  return "userId" in payload && typeof payload.userId === "string";
}

export function signAuthToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "7d",
  });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  const payload = jwt.verify(token, getJwtSecret());

  if (!isAuthTokenPayload(payload)) {
    throw new Error("Token inválido.");
  }

  return payload;
}