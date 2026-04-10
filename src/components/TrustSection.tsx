import { ShieldCheck, RefreshCw, FileText, Globe } from "lucide-react";

const reasons = [
  { icon: ShieldCheck, title: "Final Bill Comparison", desc: "We show what you actually pay, not inflated MRPs." },
  { icon: RefreshCw, title: "Fresh Price Updates", desc: "Prices refreshed frequently from live platform data." },
  { icon: FileText, title: "Transparent Fee Breakup", desc: "Every charge — delivery, platform, handling — broken down clearly." },
  { icon: Globe, title: "Local + Online in One Place", desc: "The only platform comparing kirana shops alongside online apps." },
];

const TrustSection = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">Why Trust BasketSaver?</h2>
      <p className="mx-auto mb-12 max-w-xl text-muted-foreground">Complete transparency is our promise.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r) => (
          <div key={r.title} className="rounded-xl border bg-card p-6 shadow-card">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
              <r.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-1 font-display text-base font-semibold">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
