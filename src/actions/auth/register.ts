"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function createUser(credentials: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const user = await prisma.user.create({
      data: {
        name: credentials.name,
        email: credentials.email.toLowerCase(),
        password: bcrypt.hashSync(credentials.password, 10),
      },
    });

    return {
      user,
      ok: true,
      message: "Usuario creado correctamente",
    };
  } catch (error) {
    console.log(error);
  }
}
