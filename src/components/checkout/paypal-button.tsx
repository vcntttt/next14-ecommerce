"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { Skeleton } from "@/components/ui/skeleton";
import { setTransactionId } from "@/actions/payments/set-transaction-id";
import { paypalCheckPayment } from "@/actions/payments/check-paypal-payment";
import { toast } from "sonner";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  async function createOrder(
    data: CreateOrderData,
    actions: CreateOrderActions
  ) {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${roundedAmount}`,
            currency_code: "USD",
          },
        },
      ],
    });

    const response = await setTransactionId({
      transactionId,
      orderId,
    });

    if (!response.ok) {
      toast.error(response.message);
      throw new Error(response.message);
    }

    // console.log("🚀 ~ PaypalButton ~ transactionId:", transactionId)
    return transactionId;
  }

  async function onAprove(data: OnApproveData, actions: OnApproveActions) {
    const details = await actions.order?.capture();
    if (!details?.id) {
      toast.error("No se pudo encontrar el pago");
      return;
    }

    const { ok } = await paypalCheckPayment(details.id);
    if (!ok) {
      toast.error("Error al verificar el pago");
      throw new Error("Error al verificar el pago");
    }

    toast.success("Pago verificado correctamente");
  }

  return isPending ? (
    <>
      <Skeleton className="w-full h-11 fade-out" />
      <Skeleton className="w-full h-11 fade-out" />
      <Skeleton className="w-2/3 h-4 fade-out" />
    </>
  ) : (
    <PayPalButtons
      className="w-full"
      createOrder={createOrder}
      onApprove={onAprove}
    />
  );
};
