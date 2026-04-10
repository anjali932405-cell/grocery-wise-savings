import { ShoppingBasket } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card py-12">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-primary">
            <ShoppingBasket className="h-5 w-5" /> BasketSaver
          </div>
          <p className="text-sm text-muted-foreground">India's smartest grocery price comparison platform. Save more on every grocery run.</p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-primary">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-primary">How It Works</a></li>
            <li><a href="#compare" className="hover:text-primary">Demo</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">About</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
            <li><a href="#" className="hover:text-primary">Join as a Store</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BasketSaver India. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
