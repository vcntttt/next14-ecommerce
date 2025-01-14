"use server";

import { auth } from "@/auth";
import { Address } from "@/interfaces/address";
import { prisma } from "@/lib/prisma";
import { Size } from "@prisma/client";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

interface Props {
  products: ProductToOrder[];
  address: Address;
}

export async function placeOrder({ products, address }: Props) {
  const session = await auth();
  if (!session?.user)
    return {
      ok: false,
      message: "No se encontró un usuario en la sesión",
    };

  const userId = session.user.id!;

  const dbProducts = await prisma.product.findMany({
    where: {
      id: {
        in: products.map((product) => product.productId),
      },
    },
  });

  const itemsInOrder = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const { subTotal, tax, total } = products.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const dbProduct = dbProducts.find(
        (product) => product.id === item.productId
      );

      if (!dbProduct) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = dbProduct.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  try {
    // Transaccion
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Acualizar stock de los productos
      const updatedProductsPromises = dbProducts.map((product) => {
        //  Acumular los valores
        const productQuantity = products
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos en las existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.stock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: products.map((p) => ({
                productId: p.productId,
                quantity: p.quantity,
                size: p.size,
                price:
                  dbProducts.find((dbP) => dbP.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // 3. Crear la direccion de la orden
      const orderAddress = await tx.orderAddress.create({
        data: {
          orderId: order.id,
          ...address,
        },
      });

      return {
        order,
        updatedProducts: {},
        orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      message: "Orden creada",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al crear la orden",
    };
  }
}
