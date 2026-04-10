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
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'GOOGLE_SEARCH_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const cx = Deno.env.get('GOOGLE_SEARCH_ENGINE_ID');
    if (!cx) {
      return new Response(
        JSON.stringify({ success: false, error: 'GOOGLE_SEARCH_ENGINE_ID not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const searchQuery = `${query} price India buy online`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(searchQuery)}&num=${Math.min(num, 10)}`;

    console.log('Searching Google for:', searchQuery);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('Google API error:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ success: false, error: data.error?.message || `Google API error [${response.status}]` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse results into a cleaner format
    const results = (data.items || []).map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      displayLink: item.displayLink,
      image: item.pagemap?.cse_image?.[0]?.src || null,
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
