import { ClipboardList, Search, BarChart3, Smile } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Enter Your List", desc: "Type or paste your grocery list — from a few items to a full monthly basket." },
  { icon: Search, title: "We Fetch Prices", desc: "Prices from DMart, Blinkit, Zepto, BigBasket, ONDC sellers & local kirana shops." },
  { icon: BarChart3, title: "Smart Optimization", desc: "We calculate the cheapest basket or item-wise split including all hidden fees." },
  { icon: Smile, title: "You Save Money", desc: "See exact savings, where to buy each item, and a clear recommendation." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="bg-secondary/50 py-16 md:py-24">
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">How It Works</h2>
      <p className="mx-auto mb-14 max-w-xl text-muted-foreground">Four simple steps to start saving on every grocery run.</p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="relative">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-md">
              <s.icon className="h-7 w-7" />
            </div>
            <span className="mb-2 block font-display text-xs font-bold uppercase tracking-widest text-accent">Step {i + 1}</span>
            <h3 className="mb-2 font-display text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
