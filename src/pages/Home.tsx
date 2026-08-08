import { Seo } from '@/components/common/Seo'
import { Hero, About, Services, WhyChooseUs, Contact, Faq, Portfolio } from '@/components/sections'
import { useScrollToHash } from '@/hooks/useScrollToHash'

export default function Home() {
  useScrollToHash()

  return (
    <>
      <Seo
        title="BTech — Transformer les idées en expériences numériques"
        description="BTech est une agence de solutions numériques qui crée des sites web, applications, identités de marque et supports marketing modernes en Tunisie."
      />
      <Hero />
      <Portfolio />
      <About />
      <Services />
      {/* <Pricing /> */}
      <WhyChooseUs />
      <Contact />
      <Faq />
    </>
  )
}
