"use client"

import { ChangeEvent } from "react"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  'data-testid'?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Останні надходження",
  },
  {
    value: "price_asc",
    label: "Ціна: низька -> висока",
  },
  {
    value: "price_desc",
    label: "Ціна: висока -> низька",
  },
]

const SortProducts = ({ 'data-testid': dataTestId, sortBy, setQueryParams }: SortProductsProps) => {
  const handleChange = (e: ChangeEvent<HTMLButtonElement>) => {
    const newSortBy = e.target.value as SortOptions
    setQueryParams("sortBy", newSortBy)
  }

  return (
    <FilterRadioGroup
      title="Сортувати за"
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
