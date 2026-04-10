import { ShoppingCart, LayoutList, Store, Calculator, Receipt, Lightbulb, Languages, Smartphone } from "lucide-react";

const features = [
  { icon: ShoppingCart, title: "Basket-Level Optimization", desc: "Find the cheapest way to buy your entire grocery list, not just individual items." },
  { icon: LayoutList, title: "Item-by-Item Comparison", desc: "See per-item prices across all platforms and local stores side by side." },
  { icon: Store, title: "Local Kirana Comparison", desc: "Compare online prices with your neighbourhood shop for the real picture." },
  { icon: Calculator, title: "Hidden Fee Calculator", desc: "Delivery, platform, handling, surge — we expose every hidden charge." },
  { icon: Receipt, title: "GST/Final Bill Breakdown", desc: "Complete tax-inclusive bill so you know the exact amount you'll pay." },
  { icon: Lightbulb, title: "Smart Savings Suggestions", desc: "AI-powered tips like 'buy oil from DMart, dal from local shop' for max savings." },
  { icon: Languages, title: "Hindi + English Support", desc: "Built for Bharat — bilingual interface coming soon for wider accessibility." },
  { icon: Smartphone, title: "Mobile-First Design", desc: "Optimized for the way India shops — fast, clean, works on any phone." },
];

const FeaturesSection = () => (
  <section id="features" className="py-16 md:py-24">
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">Powerful Features</h2>
      <p className="mx-auto mb-12 max-w-xl text-muted-foreground">Everything you need to make smarter grocery decisions.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="group rounded-xl border bg-card p-6 text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
              <f.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
            </div>
            <h3 className="mb-1 font-display text-base font-semibold">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
