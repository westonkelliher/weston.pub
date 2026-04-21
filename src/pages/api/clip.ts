import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

function checkAuth(request: Request): boolean {
  const token = (env as any).CLIP_TOKEN as string;
  const header = request.headers.get('Authorization');
  if (header) {
    const t = header.replace(/^Bearer\s+/i, '');
    if (t === token) return true;
  }
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/(?:^|;\s*)clip_token=([^\s;]+)/);
  return !!match && match[1] === token;
}

function getKV(): KVNamespace {
  return (env as any).CLIP_KV;
}

const KEY = 'latest';

export const POST: APIRoute = async ({ request }) => {
  if (!checkAuth(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const contentType = request.headers.get('Content-Type') || '';
  let content: string;
  let type = 'text';

  if (contentType.includes('application/json')) {
    const body = await request.json();
    content = body.content;
    type = body.type || 'text';
  } else {
    content = await request.text();
  }

  if (!content) {
    return new Response('No content', { status: 400 });
  }

  const entry = { type, content, timestamp: Date.now() };
  await getKV().put(KEY, JSON.stringify(entry));

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET: APIRoute = async ({ request }) => {
  if (!checkAuth(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const raw = await getKV().get(KEY);
  if (!raw) {
    return new Response(JSON.stringify({ content: null }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(raw, {
    headers: { 'Content-Type': 'application/json' },
  });
};
