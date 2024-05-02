import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { listCustomerOrders } from "@lib/data"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Замовлення",
  description: "Огляд ваших попередніх замовлень.",
}

export default async function Orders() {
  const orders = await listCustomerOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Замовлення</h1>
        <p className="text-base-regular">
          Перегляньте свої попередні замовлення та їх статус. Ви також можете створити
          повернення або обмін для ваших замовлень, якщо це необхідно.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
      </div>
    </div>
  )
}
