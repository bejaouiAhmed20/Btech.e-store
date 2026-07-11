import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Accordion } from '@/components/ui/Accordion'
import { faqItems } from '@/data/values'

export function Faq() {
  return (
    <section id="faq" className="snap-section py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="FAQ" title="Questions fréquentes." />
        <Accordion items={faqItems} />
      </Container>
    </section>
  )
}
