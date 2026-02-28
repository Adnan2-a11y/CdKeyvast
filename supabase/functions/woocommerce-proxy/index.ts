import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const WC_URL = Deno.env.get("WOOCOMMERCE_URL")!;
    const CK = Deno.env.get("WOOCOMMERCE_CONSUMER_KEY")!;
    const CS = Deno.env.get("WOOCOMMERCE_CONSUMER_SECRET")!;

    const authHeader =
      "Basic " + btoa(`${CK}:${CS}`);

    const { endpoint, method = "GET", body, fetchAll = false } = await req.json();

    if (!endpoint) {
      return new Response(
        JSON.stringify({ error: "Missing 'endpoint' parameter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Whitelist allowed endpoints for security
    const allowedPrefixes = [
      "/wp-json/wc/v3/products",
      "/wp-json/wc/v3/orders",
      "/wp-json/wc/v3/customers",
      "/wp-json/wc/v3/payment_gateways",
    ];
    const isAllowed = allowedPrefixes.some((prefix) => endpoint.startsWith(prefix));
    if (!isAllowed) {
      return new Response(
        JSON.stringify({ error: "Endpoint not allowed" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If fetchAll is true, paginate through all results
    if (fetchAll && method === "GET") {
      let allResults: any[] = [];
      let page = 1;
      const separator = endpoint.includes("?") ? "&" : "?";

      while (true) {
        const paginatedUrl = `${WC_URL}${endpoint}${separator}per_page=100&page=${page}`;
        const res = await fetch(paginatedUrl, {
          method: "GET",
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          return new Response(
            JSON.stringify({ error: `WooCommerce error: ${res.status}`, details: errorText }),
            { status: res.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1");
        const total = parseInt(res.headers.get("X-WP-Total") || "0");
        const data = await res.json();
        allResults = [...allResults, ...data];

        if (page >= totalPages) {
          return new Response(
            JSON.stringify({ data: allResults, total, totalPages }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        page++;
      }
    }

    // Single request
    const url = `${WC_URL}${endpoint}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    };

    if (body && method !== "GET") {
      fetchOptions.body = JSON.stringify(body);
    }

    const res = await fetch(url, fetchOptions);
    const totalPages = res.headers.get("X-WP-TotalPages");
    const total = res.headers.get("X-WP-Total");
    const data = await res.json();

    return new Response(
      JSON.stringify({
        data,
        total: total ? parseInt(total) : undefined,
        totalPages: totalPages ? parseInt(totalPages) : undefined,
      }),
      {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
