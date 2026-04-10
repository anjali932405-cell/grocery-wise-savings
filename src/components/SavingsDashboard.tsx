import { TrendingDown, Award, Wallet, Calendar } from "lucide-react";
import { sampleGroceryItems, platformFees } from "@/data/mockData";

const SavingsDashboard = () => {
  const totals = {
    dmart: sampleGroceryItems.reduce((s, i) => s + i.dmart, 0) + Object.values(platformFees.dmart).reduce((a, b) => a + b, 0),
    blinkit: sampleGroceryItems.reduce((s, i) => s + i.blinkit, 0) + Object.values(platformFees.blinkit).reduce((a, b) => a + b, 0),
    zepto: sampleGroceryItems.reduce((s, i) => s + i.zepto, 0) + Object.values(platformFees.zepto).reduce((a, b) => a + b, 0),
    local: sampleGroceryItems.reduce((s, i) => s + i.local, 0) + Object.values(platformFees.local).reduce((a, b) => a + b, 0),
  };
  const cheapest = Math.min(totals.dmart, totals.blinkit, totals.zepto, totals.local);
  const expensive = Math.max(totals.dmart, totals.blinkit, totals.zepto, totals.local);
  const saved = expensive - cheapest;
  const monthly = saved * 4;

  const cards = [
    { icon: Wallet, label: "Best Basket Total", value: `₹${cheapest}`, sub: "Local Shop wins" },
    { icon: TrendingDown, label: "You Save (this order)", value: `₹${saved}`, sub: "vs most expensive option" },
    { icon: Calendar, label: "Monthly Savings Est.", value: `₹${monthly}`, sub: "4 orders/month" },
    { icon: Award, label: "Recommendation", value: "Smart Split", sub: "Buy 4 items from DMart, 4 from local" },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">Your Savings Dashboard</h2>
        <p className="mx-auto mb-10 max-w-xl text-muted-foreground">Based on the sample basket above, here's what you'd save.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="rounded-xl border bg-card p-6 shadow-card text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <c.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.label}</p>
              <p className="my-1 font-display text-2xl font-bold">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavingsDashboard;
