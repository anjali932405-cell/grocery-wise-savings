import { AlertTriangle, Eye, IndianRupee, Search } from "lucide-react";

const problems = [
  { icon: Search, title: "Multiple App Juggling", desc: "You check Blinkit, Zepto, DMart, BigBasket and still aren't sure who's cheapest." },
  { icon: Eye, title: "Hidden Charges", desc: "Delivery fees, platform fees, handling charges, surge pricing — they all add up silently." },
  { icon: IndianRupee, title: "Missing Local Deals", desc: "Your neighbourhood kirana shop might be cheaper, but you'll never know without comparing." },
  { icon: AlertTriangle, title: "Tax Confusion", desc: "GST, inclusive pricing, MRP vs selling price — the real cost is always a mystery." },
];

const ProblemSection = () => (
  <section className="bg-secondary/50 py-16 md:py-24">
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">The Grocery Shopping Problem</h2>
      <p className="mx-auto mb-12 max-w-2xl text-muted-foreground">
        Indian households spend 30–40% of income on groceries. Yet most families overpay because comparing real final costs across platforms is nearly impossible.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {problems.map((p) => (
          <div key={p.title} className="rounded-xl bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <p.icon className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
