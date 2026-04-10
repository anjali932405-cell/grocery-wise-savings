import { supabase } from '@/integrations/supabase/client';

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
  image: string | null;
}

export interface SearchResponse {
  success: boolean;
  results?: SearchResult[];
  totalResults?: string;
  error?: string;
}

export async function searchGroceryPrices(query: string, num = 5): Promise<SearchResponse> {
  const { data, error } = await supabase.functions.invoke('google-search', {
    body: { query, num },
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return data;
}
