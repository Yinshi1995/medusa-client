import { Heading, Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        Кошик
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        У вашому кошику нічого немає. Давайте змінимо це, скориставшись посиланням нижче, щоб почати переглядати наші товари.
      </Text>
      <div>
        <InteractiveLink href="/store">Переглянути товари</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
