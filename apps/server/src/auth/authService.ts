import { prisma } from "../db/prisma";

import { comparePassword, hashPassword } from "./password";
import { signAuthToken } from "./jwt";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toPublicUser(user: {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const name = input.name.trim();
  const email = normalizeEmail(input.email);
  const password = input.password;

  if (name.length < 2) {
    throw new Error("Nome precisa ter pelo menos 2 caracteres.");
  }

  if (!email.includes("@")) {
    throw new Error("E-mail inválido.");
  }

  if (password.length < 6) {
    throw new Error("Senha precisa ter pelo menos 6 caracteres.");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Já existe uma conta com esse e-mail.");
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  const token = signAuthToken({
    userId: user.id,
  });

  return {
    user: toPublicUser(user),
    token,
  };
}

export async function loginUser(input: { email: string; password: string }) {
  const email = normalizeEmail(input.email);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const passwordMatches = await comparePassword(input.password, user.passwordHash);

  if (!passwordMatches) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const token = signAuthToken({
    userId: user.id,
  });

  return {
    user: toPublicUser(user),
    token,
  };
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  return toPublicUser(user);
}