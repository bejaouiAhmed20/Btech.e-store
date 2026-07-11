import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { Hero, About, Services, Portfolio, Pricing, WhyChooseUs, Contact, Faq } from '@/components/sections'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Seo title={t('meta.title')} description={t('meta.description')} />
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
