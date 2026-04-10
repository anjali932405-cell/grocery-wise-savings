import { useState } from "react";
import { Plus, X, ShoppingCart, Search, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { sampleGroceryItems, platformFees } from "@/data/mockData";
import { searchGroceryPrices, type SearchResult } from "@/lib/api/googleSearch";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

type View = "input" | "results" | "search";

const GroceryInput = ({ open, onOpenChange }: Props) => {
  const [items, setItems] = useState<string[]>(["Rice 5kg", "Atta 10kg", "Oil 5L"]);
  const [input, setInput] = useState("");
  const [view, setView] = useState<View>("input");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const addItem = () => {
    const val = input.trim();
    if (val && !items.includes(val)) {
      setItems([...items, val]);
      setInput("");
    }
  };

  const removeItem = (item: string) => setItems(items.filter((i) => i !== item));

  const handleCompare = () => {
    if (items.length > 0) setView("results");
  };

  const handleSearchOnline = async () => {
    const query = items.join(", ");
    setSearchQuery(query);
    setSearchLoading(true);
    setView("search");

    try {
      const res = await searchGroceryPrices(query);
      if (res.success && res.results) {
        setSearchResults(res.results);
      } else {
        toast({ title: "Search failed", description: res.error || "Could not fetch results", variant: "destructive" });
        setSearchResults([]);
      }
    } catch {
      toast({ title: "Error", description: "Failed to search prices online", variant: "destructive" });
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
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
            {view === "input" && "Enter Your Grocery List"}
            {view === "results" && "Comparison Results"}
            {view === "search" && "Online Price Search"}
          </DialogTitle>
        </DialogHeader>

        {view === "input" && (
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
            <div className="flex gap-2">
              <Button className="flex-1 bg-gradient-primary text-primary-foreground" onClick={handleCompare} disabled={items.length === 0}>
                Compare Prices
              </Button>
              <Button variant="outline" className="flex-1 gap-2" onClick={handleSearchOnline} disabled={items.length === 0}>
                <Search className="h-4 w-4" /> Search Online
              </Button>
            </div>
          </div>
        )}

        {view === "results" && (
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
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setView("input")}>← Edit List</Button>
              <Button variant="outline" className="flex-1 gap-2" onClick={handleSearchOnline}>
                <Search className="h-4 w-4" /> Search Online
              </Button>
            </div>
          </div>
        )}

        {view === "search" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Searching prices for: <span className="font-medium text-foreground">{searchQuery}</span>
            </p>
            {searchLoading ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Searching grocery prices online…</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((r, i) => (
                  <a
                    key={i}
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border p-3 transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug line-clamp-2">{r.title}</p>
                        <p className="mt-1 text-xs text-primary">{r.displayLink}</p>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.snippet}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-muted-foreground">No results found. Try a different grocery list.</p>
            )}
            <Button variant="outline" className="w-full" onClick={() => setView("input")}>← Back to List</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GroceryInput;
