import { useState } from "react";
import { Menu, X, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Compare", href: "#compare" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <ShoppingBasket className="h-7 w-7" />
          BasketSaver
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </a>
          ))}
          <Button size="sm" className="bg-gradient-primary text-primary-foreground">
            Start Comparing
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-background px-4 pb-4 md:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground">
              {l.label}
            </a>
          ))}
          <Button size="sm" className="mt-2 w-full bg-gradient-primary text-primary-foreground">
            Start Comparing
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
