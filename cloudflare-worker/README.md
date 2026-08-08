# jebakumar.in — AI Assistant (Cloudflare Worker)

The contact-page chatbot needs a real LLM, but the website is static (GitHub
Pages) and cannot hold any secret. This tiny **Cloudflare Worker** runs an open
model on **Workers AI** — Cloudflare's built-in AI binding. There is **no API
key** to create, hold, or leak, and it runs on Cloudflare's **free tier**.

```
Browser (contact.html)  --POST /-->  Cloudflare Worker  --env.AI.run()-->  Llama 3.3 (Workers AI)
                        <--reply--                       <--response--
```

## One-time deploy (free)

You need a free Cloudflare account. That's it — no credit card, no separate
API key.

```bash
cd cloudflare-worker

# 1. Log in (opens a browser once)
npx wrangler login

# 2. Deploy
npx wrangler deploy
```

Wrangler prints a URL like:

```
https://jebakumar-chatbot.<your-subdomain>.workers.dev
```

Copy that URL.

## Point the website at it

Open [`../js/chatbot.js`](../js/chatbot.js) and set the endpoint near the top:

```js
const CHATBOT_ENDPOINT = "https://jebakumar-chatbot.<your-subdomain>.workers.dev";
```

Commit and push — GitHub Pages redeploys the static site automatically.

> Until this is set (or if the Worker is ever unreachable), the chatbot falls
> back to a built-in keyword responder, so the page never breaks.

## Free-tier limits

Workers AI includes a free daily allocation (thousands of requests/day) — far
more than a personal portfolio needs. If you ever want a different model, change
`MODEL` in [`worker.js`](worker.js) to any `@cf/...` chat model (see
`https://developers.cloudflare.com/workers-ai/models/`) and redeploy.

## Optional: custom domain

You can map the Worker to e.g. `api.jebakumar.in` from the Cloudflare dashboard
(Workers & Pages → your Worker → Settings → Domains & Routes). Then use that URL
as `CHATBOT_ENDPOINT`.

## Test it

```bash
curl -X POST https://jebakumar-chatbot.<your-subdomain>.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"message":"Who is Jebakumar?"}'
```

You should get `{"reply":"..."}`.
