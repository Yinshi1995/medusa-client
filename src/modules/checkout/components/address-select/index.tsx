import { Listbox, Transition } from "@headlessui/react"
import { Address, AddressPayload, Cart } from "@medusajs/medusa"
import { ChevronUpDown } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { omit } from "lodash"
import { Fragment, useMemo } from "react"

import Radio from "@modules/common/components/radio"
import { cartUpdate } from "@modules/checkout/actions"
import compareAddresses from "@lib/util/compare-addresses"

type AddressSelectProps = {
  addresses: Address[]
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
}

const AddressSelect = ({ addresses, cart }: AddressSelectProps) => {
  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id)
    if (savedAddress) {
      cartUpdate({
        shipping_address: omit(savedAddress, [
          "id",
          "created_at",
          "updated_at",
          "country",
          "deleted_at",
          "metadata",
          "customer_id",
        ]) as AddressPayload,
      })
    }
  }

  const selectedAddress = useMemo(() => {
    return addresses.find((a) => compareAddresses(a, cart?.shipping_address))
  }, [addresses, cart?.shipping_address])

  return (
    <Listbox onChange={handleSelect} value={selectedAddress?.id}>
      <div className="relative">
        <Listbox.Button
          className="relative w-full flex justify-between items-center px-4 py-[10px] text-left bg-white cursor-default focus:outline-none border rounded-rounded focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-gray-300 focus-visible:ring-offset-2 focus-visible:border-gray-300 text-base-regular"
          data-testid="shipping-address-select">
          {({ open }) => (
            <>
              <span className="block truncate">
                {selectedAddress
                  ? selectedAddress.address_1
                  : "Виберіть адресу"}
              </span>
              <ChevronUpDown
                className={clx("transition-rotate duration-200", {
                  "transform rotate-180": open,
                })}
              />
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-20 w-full overflow-auto text-small-regular bg-white border border-top-0 max-h-60 focus:outline-none sm:text-sm"
            data-testid="shipping-address-options">
            {addresses.map((address) => {
              return (
                <Listbox.Option
                  key={address.id}
                  value={address.id}
                  className="cursor-default select-none relative pl-6 pr-10 hover:bg-gray-50 py-4"
                  data-testid="shipping-address-option"
                >
                  <div className="flex gap-x-4 items-start">
                    <Radio checked={selectedAddress?.id === address.id} data-testid="shipping-address-radio" />
                    <div className="flex flex-col">
                      <span className="text-left text-base-semi">
                        {address.first_name} {address.last_name}
                      </span>
                      {address.company && (
                        <span className="text-small-regular text-ui-fg-base">
                          {address.company}
                        </span>
                      )}
                      <div className="flex flex-col text-left text-base-regular mt-2">
                        <span>
                          {address.address_1}
                          {address.address_2 && (
                            <span>, {address.address_2}</span>
                          )}
                        </span>
                        <span>
                          {address.postal_code}, {address.city}
                        </span>
                        <span>
                          {address.province && `${address.province}, `}
                          {address.country_code?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default AddressSelect
