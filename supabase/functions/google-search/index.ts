const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query, num = 5 } = await req.json();

    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('GOOGLE_SEARCH_API_KEY');
    const cx = Deno.env.get('GOOGLE_SEARCH_ENGINE_ID');

    if (!apiKey || !cx) {
      return new Response(
        JSON.stringify({ success: false, error: 'Google Custom Search API credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const searchQuery = `${query} price India buy online`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(searchQuery)}&gl=in&hl=en&num=${Math.min(num, 10)}`;

    console.log('Searching Google Custom Search for:', searchQuery);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('Google Search error:', JSON.stringify(data.error || data));
      return new Response(
        JSON.stringify({ success: false, error: data.error?.message || `Google Search error [${response.status}]` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results = (data.items || []).slice(0, num).map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet || '',
      displayLink: item.displayLink || new URL(item.link).hostname,
      image: item.pagemap?.cse_thumbnail?.[0]?.src || null,
    }));

    console.log(`Found ${results.length} results`);

    return new Response(
      JSON.stringify({ success: true, results, totalResults: data.searchInformation?.totalResults }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Search error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
