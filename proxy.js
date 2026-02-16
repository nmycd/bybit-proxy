export async function GET(request) {
  const url = new URL(request.url);
  const path = url.searchParams.get('path');
  if (!path) {
    return new Response('Missing path', { status: 400 });
  }

  url.searchParams.delete('path');
  const target = new URL(path, 'https://api.bybit.com');
  for (const [key, value] of url.searchParams.entries()) {
    target.searchParams.set(key, value);
  }

  const response = await fetch(target, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.9',
      Origin: 'https://www.bybit.com',
      Referer: 'https://www.bybit.com/'
    }
  });

  const body = await response.arrayBuffer();
  return new Response(body, {
    status: response.status,
    headers: {
      'content-type': response.headers.get('content-type') ?? 'application/json'
    }
  });
}
