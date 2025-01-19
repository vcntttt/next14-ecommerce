"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateRole(userId: string, role: Role) {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    return {
      ok: false,
      message: "No tienes permisos para realizar esta acción",
    };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath("/admin/users");
    return { ok: true, message: "Rol actualizado correctamente" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al actualizar el rol" };
  }
}
