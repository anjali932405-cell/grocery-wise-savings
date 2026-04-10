import { Check } from "lucide-react";

const points = [
  "Product price comparison across platforms",
  "Discount & coupon impact on final cost",
  "GST & tax calculation built-in",
  "Delivery charges included",
  "Platform & handling fees exposed",
  "Final basket total — what you actually pay",
  "Local kirana shop advantages shown",
  "App-only discounts surfaced",
];

const SolutionSection = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">Our Solution</span>
        <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
          One Search. Complete Cost Transparency.
        </h2>
        <p className="mb-10 text-muted-foreground">BasketSaver doesn't just compare product prices — it compares <strong>final payable amounts</strong> so you know exactly what leaves your wallet.</p>
      </div>
      <div className="mx-auto grid max-w-2xl gap-3">
        {points.map((pt) => (
          <div key={pt} className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium">{pt}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
