import { useState } from "react";
import { Search as SearchIcon, Loader2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
}

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      const { data, error } = await supabase.functions.invoke("google-search", {
        body: { query: query.trim() },
      });

      if (error) throw error;

      if (data?.success && data.results) {
        setResults(data.results);
      } else {
        toast({ title: "Search failed", description: data?.error || "No results", variant: "destructive" });
        setResults([]);
      }
    } catch {
      toast({ title: "Error", description: "Failed to fetch search results", variant: "destructive" });
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 pt-28 pb-16">
        <h1 className="mb-2 text-center font-display text-3xl font-bold text-foreground">
          Search Grocery Prices
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
          Find the best deals across online stores in India
        </p>

        <div className="flex gap-2">
          <Input
            placeholder="e.g. Toor Dal 1kg price online"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="text-base"
          />
          <Button onClick={handleSearch} disabled={loading || !query.trim()} className="shrink-0 gap-2 bg-gradient-primary text-primary-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
            Search
          </Button>
        </div>

        <div className="mt-8 space-y-4">
          {loading && (
            <div className="flex flex-col items-center gap-3 py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Searching…</p>
            </div>
          )}

          {!loading && results.map((r, i) => (
            <a key={i} href={r.link} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="transition-colors hover:border-primary hover:bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-start justify-between gap-2 text-base">
                    <span className="line-clamp-2">{r.title}</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </CardTitle>
                  <p className="text-xs text-primary">{r.displayLink}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{r.snippet}</p>
                </CardContent>
              </Card>
            </a>
          ))}

          {!loading && searched && results.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">No results found. Try a different query.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
