import { Badge } from "@medusajs/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <Badge color="orange" className={className}>
      <span className="font-semibold">Увага:</span> Для тестування
       тільки.
    </Badge>
  )
}

export default PaymentTest
