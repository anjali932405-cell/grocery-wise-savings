import { useState } from "react";
import { Plus, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { sampleGroceryItems, platformFees } from "@/data/mockData";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const GroceryInput = ({ open, onOpenChange }: Props) => {
  const [items, setItems] = useState<string[]>(["Rice 5kg", "Atta 10kg", "Oil 5L"]);
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);

  const addItem = () => {
    const val = input.trim();
    if (val && !items.includes(val)) {
      setItems([...items, val]);
      setInput("");
    }
  };

  const removeItem = (item: string) => setItems(items.filter((i) => i !== item));

  const handleCompare = () => {
    if (items.length > 0) setShowResults(true);
  };

  const totals = {
    dmart: sampleGroceryItems.reduce((s, i) => s + i.dmart, 0) + Object.values(platformFees.dmart).reduce((a, b) => a + b, 0),
    blinkit: sampleGroceryItems.reduce((s, i) => s + i.blinkit, 0) + Object.values(platformFees.blinkit).reduce((a, b) => a + b, 0),
    zepto: sampleGroceryItems.reduce((s, i) => s + i.zepto, 0) + Object.values(platformFees.zepto).reduce((a, b) => a + b, 0),
    local: sampleGroceryItems.reduce((s, i) => s + i.local, 0) + Object.values(platformFees.local).reduce((a, b) => a + b, 0),
  };
  const cheapest = Math.min(totals.dmart, totals.blinkit, totals.zepto, totals.local);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <ShoppingCart className="h-5 w-5 text-primary" />
            {showResults ? "Comparison Results" : "Enter Your Grocery List"}
          </DialogTitle>
        </DialogHeader>

        {!showResults ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="e.g. Toor Dal 1kg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem()}
              />
              <Button size="icon" onClick={addItem} className="bg-gradient-primary text-primary-foreground shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Badge key={item} variant="secondary" className="gap-1 pl-3 pr-1 py-1.5">
                  {item}
                  <button onClick={() => removeItem(item)} className="ml-1 rounded-full p-0.5 hover:bg-muted">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {items.length === 0 && <p className="text-center text-sm text-muted-foreground">Add items to your grocery list to start comparing.</p>}
            <Button className="w-full bg-gradient-primary text-primary-foreground" onClick={handleCompare} disabled={items.length === 0}>
              Compare Prices
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border bg-primary/5 p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Best Total Price</p>
              <p className="font-display text-3xl font-bold text-primary">₹{cheapest}</p>
              <p className="text-sm text-muted-foreground">Local Shop + DMart Smart Split</p>
            </div>
            <div className="space-y-2">
              {Object.entries(totals).map(([key, val]) => (
                <div key={key} className={`flex items-center justify-between rounded-lg border p-3 ${val === cheapest ? "border-primary bg-primary/5" : ""}`}>
                  <span className="text-sm font-medium capitalize">{key === "local" ? "Local Shop" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${val === cheapest ? "text-primary" : ""}`}>₹{val}</span>
                    {val === cheapest && <Badge className="bg-gradient-primary text-primary-foreground text-xs">Best</Badge>}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border bg-accent/10 p-3 text-center">
              <p className="text-sm font-medium">You save <span className="font-bold text-primary">₹{Math.max(...Object.values(totals)) - cheapest}</span> vs the most expensive option!</p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setShowResults(false)}>← Edit List</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GroceryInput;
