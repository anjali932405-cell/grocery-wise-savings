import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/mockData";

const FAQSection = () => (
  <section id="faq" className="bg-secondary/50 py-16 md:py-24">
    <div className="container mx-auto max-w-2xl px-4">
      <h2 className="mb-3 text-center font-display text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
      <p className="mb-10 text-center text-muted-foreground">Got questions? We've got answers.</p>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border bg-card px-5 shadow-sm">
            <AccordionTrigger className="text-left font-medium hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
