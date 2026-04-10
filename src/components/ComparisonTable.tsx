import { sampleGroceryItems, platformFees } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const fmt = (n: number) => `₹${n}`;

const bestColor = (price: number, row: typeof sampleGroceryItems[0]) => {
  const min = Math.min(row.dmart, row.blinkit, row.zepto, row.local);
  return price === min ? "font-bold text-primary" : "";
};

const ComparisonTable = () => {
  const totals = {
    dmart: sampleGroceryItems.reduce((s, i) => s + i.dmart, 0),
    blinkit: sampleGroceryItems.reduce((s, i) => s + i.blinkit, 0),
    zepto: sampleGroceryItems.reduce((s, i) => s + i.zepto, 0),
    local: sampleGroceryItems.reduce((s, i) => s + i.local, 0),
  };
  const fees = {
    dmart: Object.values(platformFees.dmart).reduce((a, b) => a + b, 0),
    blinkit: Object.values(platformFees.blinkit).reduce((a, b) => a + b, 0),
    zepto: Object.values(platformFees.zepto).reduce((a, b) => a + b, 0),
    local: Object.values(platformFees.local).reduce((a, b) => a + b, 0),
  };

  return (
    <section id="compare" className="bg-secondary/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">Live Demo Comparison</h2>
          <p className="mx-auto mb-10 max-w-xl text-muted-foreground">See how BasketSaver compares a sample grocery basket across platforms.</p>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold">Item</th>
                <th className="px-4 py-3 text-right font-semibold">DMart</th>
                <th className="px-4 py-3 text-right font-semibold">Blinkit</th>
                <th className="px-4 py-3 text-right font-semibold">Zepto</th>
                <th className="px-4 py-3 text-right font-semibold">Local Shop</th>
                <th className="px-4 py-3 text-center font-semibold">Best</th>
                <th className="px-4 py-3 text-right font-semibold">Savings</th>
              </tr>
            </thead>
            <tbody>
              {sampleGroceryItems.map((item) => {
                const prices = [item.dmart, item.blinkit, item.zepto, item.local];
                const max = Math.max(...prices);
                const min = Math.min(...prices);
                return (
                  <tr key={item.name} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className={`px-4 py-3 text-right ${bestColor(item.dmart, item)}`}>{fmt(item.dmart)}</td>
                    <td className={`px-4 py-3 text-right ${bestColor(item.blinkit, item)}`}>{fmt(item.blinkit)}</td>
                    <td className={`px-4 py-3 text-right ${bestColor(item.zepto, item)}`}>{fmt(item.zepto)}</td>
                    <td className={`px-4 py-3 text-right ${bestColor(item.local, item)}`}>{fmt(item.local)}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">{item.best}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-primary">{fmt(max - min)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 bg-muted/30 font-semibold">
                <td className="px-4 py-3">Subtotal</td>
                <td className="px-4 py-3 text-right">{fmt(totals.dmart)}</td>
                <td className="px-4 py-3 text-right">{fmt(totals.blinkit)}</td>
                <td className="px-4 py-3 text-right">{fmt(totals.zepto)}</td>
                <td className="px-4 py-3 text-right">{fmt(totals.local)}</td>
                <td />
                <td />
              </tr>
              <tr className="bg-muted/30 text-xs text-muted-foreground">
                <td className="px-4 py-2">+ Delivery & Fees</td>
                <td className="px-4 py-2 text-right">{fmt(fees.dmart)}</td>
                <td className="px-4 py-2 text-right">{fmt(fees.blinkit)}</td>
                <td className="px-4 py-2 text-right">{fmt(fees.zepto)}</td>
                <td className="px-4 py-2 text-right">{fmt(fees.local)}</td>
                <td />
                <td />
              </tr>
              <tr className="bg-primary/5 font-bold text-base">
                <td className="px-4 py-3">Final Total</td>
                <td className="px-4 py-3 text-right">{fmt(totals.dmart + fees.dmart)}</td>
                <td className="px-4 py-3 text-right">{fmt(totals.blinkit + fees.blinkit)}</td>
                <td className="px-4 py-3 text-right">{fmt(totals.zepto + fees.zepto)}</td>
                <td className="px-4 py-3 text-right text-primary">{fmt(totals.local + fees.local)}</td>
                <td className="px-4 py-3 text-center"><Badge className="bg-gradient-primary text-primary-foreground">Local Shop</Badge></td>
                <td className="px-4 py-3 text-right text-primary">{fmt((totals.blinkit + fees.blinkit) - (totals.local + fees.local))}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
