"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            Product: {
              select: {
                id: true,
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
      cacheStrategy: {
        ttl: 60 * 60 * 24,
        tags: [`order-${id}`],
      },
    });

    if (!order) throw `${id} no existe`;

    if (session.user.role === Role.USER) {
      if (session.user.id !== order.userId) {
        throw `${id} no es de ese usuario`;
      }
    }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Orden no existe",
    };
  }
};

export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      OrderAddress: {
        select: {
          name: true,
          lastName: true,
        },
      },
    },
    // cacheStrategy: {
    //   ttl: 60 * 60 * 24,
    //   tags: [`orders-user-${session.user.id}`],
    // },
  });

  return {
    ok: true,
    orders: orders,
  };
};

export const getOrdersByAdmin = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  if (session.user.role !== Role.ADMIN) {
    return {
      ok: false,
      message: "No tienes permisos para acceder a esta página",
    };
  }

  const orders = await prisma.order.findMany({
    include: {
      OrderAddress: {
        select: {
          name: true,
          lastName: true,
        },
      },
    },
    cacheStrategy: {
      ttl: 60 * 60 * 24,
      tags: ["orders"],
    },
  });

  return {
    ok: true,
    orders,
  };
};
