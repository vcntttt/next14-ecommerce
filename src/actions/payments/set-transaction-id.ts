"use server";

import { prisma } from "@/lib/prisma";

interface Props {
  transactionId: string;
  orderId: string;
}

export async function setTransactionId({ transactionId, orderId }: Props) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        transactionId: transactionId,
      },
    });

    if (!order) return { ok: false };

    return {
      ok: true,
      message: "Pago asignado a la orden correctamente",
      order,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo asignar el pago a la orden",
      error,
    };
  }
}
