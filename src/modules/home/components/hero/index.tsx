import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div 
      className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle"
      style={{backgroundImage: `url('https://seikatsumi.com/wp-content/uploads/2024/02/Japanese-Mens-Fashion.png')`, backgroundSize: "cover", backgroundPosition: "center"}}
      >
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-ui-fg-base font-normal"
          >
            Шаблон стартового електронного магазину
          </Heading>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-ui-fg-subtle font-normal"
          >
            Працює на основі Next.js
          </Heading>
        </span>
        <a
          href="https://github.com/medusajs/nextjs-starter-medusa"
          target="_blank"
        >
          <Button variant="secondary">
            Переглянути на GitHub
            <Github />
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Hero
