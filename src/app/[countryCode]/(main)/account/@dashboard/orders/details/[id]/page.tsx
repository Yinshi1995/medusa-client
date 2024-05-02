import { Metadata } from "next"
import { notFound } from "next/navigation"

import { retrieveOrder } from "@lib/data"
import OrderDetailsTemplate from "@modules/order/templates/order-details-template"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return {
    title: `Заказ #${order.display_id}`,
    description: `Побачити ваш заказ`,
  }
}

export default async function OrderDetailPage({ params }: Props) {
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return <OrderDetailsTemplate order={order} />
}
