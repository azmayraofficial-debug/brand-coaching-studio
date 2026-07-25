export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const body = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GROQ_API_KEY not configured in Vercel Environment Variables" }), {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1500,
        messages: body.messages,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      const converted = {
        content: [{ type: "text", text: data.choices[0].message.content }]
      };
      return new Response(JSON.stringify(converted), {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: data.error?.message || "Empty response from Groq" }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    });
  }
}
