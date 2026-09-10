import { parseApiResponse } from "@/core/api/parseResponse";
import { SERVER_URL } from "@/core/api/serverUrl";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  ok: boolean;
  user: AuthUser;
  token: string;
  error?: string;
}

interface MeResponse {
  ok: boolean;
  user: AuthUser;
  error?: string;
}


export async function registerRequest(input: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${SERVER_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseApiResponse<AuthResponse>(response);
}

export async function loginRequest(input: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseApiResponse<AuthResponse>(response);
}

export async function meRequest(token: string) {
  const response = await fetch(`${SERVER_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseApiResponse<MeResponse>(response);
}
