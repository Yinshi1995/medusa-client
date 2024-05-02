import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getCustomer, getRegion } from "@lib/data"

import { headers } from "next/headers"

export const metadata: Metadata = {
  title: "Адреси",
  description: "Перегляньте свої адреси",
}

export default async function Addresses() {
  const nextHeaders = headers()
  const countryCode = nextHeaders.get("next-url")?.split("/")[1] || ""
  const customer = await getCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Адреси доставки</h1>
        <p className="text-base-regular">
          Переглядайте та оновлюйте свої адреси доставки, ви можете додати скільки завгодно
          люблю. Якщо зберегти ваші адреси, вони стануть доступними під час оформлення замовлення.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
