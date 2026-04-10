import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-grocery.png";

interface Props {
  onStartComparing: () => void;
}

const HeroSection = ({ onStartComparing }: Props) => (
  <section className="relative overflow-hidden py-16 md:py-24">
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
    <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
      <div className="max-w-xl">
        <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          🇮🇳 India's Smartest Grocery Saver
        </span>
        <h1 className="mb-4 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Stop Overpaying for <span className="text-gradient-primary">Groceries</span>
        </h1>
        <p className="mb-6 text-lg text-muted-foreground md:text-xl">
          Enter your grocery list and instantly see where to buy each item at the lowest <strong>final cost</strong> — including delivery, platform fees & taxes.
        </p>
        <p className="mb-8 text-sm font-semibold text-accent">
          Average families save ₹1,500–₹3,000/month on groceries!
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="bg-gradient-primary text-primary-foreground" onClick={onStartComparing}>
            Start Comparing <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#compare"><Play className="mr-2 h-4 w-4" /> See Demo</a>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <img src={heroImg} alt="Indian grocery basket with vegetables, rice, oil and everyday essentials" className="w-full max-w-md rounded-2xl shadow-card" />
      </div>
    </div>
  </section>
);

export default HeroSection;
