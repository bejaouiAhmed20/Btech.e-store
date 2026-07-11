import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Accordion } from '@/components/ui/Accordion'
import { faqItems } from '@/data/values'

export function Faq() {
  const { t } = useTranslation()

  const items = faqItems.map((item) => ({
    id: item.id,
    question: t(`faq.items.${item.id}.question`),
    answer: t(`faq.items.${item.id}.answer`),
  }))

  return (
    <section id="faq" className="snap-section py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
        <Accordion items={items} />
      </Container>
    </section>
  )
}
