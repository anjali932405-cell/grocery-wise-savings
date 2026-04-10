import { MessageSquare, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const perks = [
  { icon: MessageSquare, title: "WhatsApp Onboarding", desc: "Update prices via WhatsApp — no app download needed." },
  { icon: BarChart3, title: "Merchant Dashboard", desc: "Simple dashboard to manage products, prices & inventory." },
  { icon: Users, title: "Reach New Customers", desc: "Get discovered by thousands of price-comparing shoppers nearby." },
];

const LocalStoresSection = () => (
  <section className="bg-secondary/50 py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">For Local Stores</span>
        <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Kirana Stores, Join the Revolution</h2>
        <p className="mb-10 text-muted-foreground">Help your customers compare fairly and bring more footfall to your shop. Onboard in minutes.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {perks.map((p) => (
          <div key={p.title} className="rounded-xl border bg-card p-6 text-center shadow-card">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <p.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button size="lg" className="bg-gradient-accent text-accent-foreground">Join as a Local Store</Button>
      </div>
    </div>
  </section>
);

export default LocalStoresSection;
