const cache: { [ _: symbol]: any } = { }
export const parse = async (r: Response) => {
  console.log(r)
  if (r.body && r.body.locked === false && r.bodyUsed === false) {
    const body = await r.json();
    console.log(body);
    if (typeof r.url === 'string' && r.url.length > 0) {
      cache[r.url] = body;
    }

    return cache[r.url] || body;
  }
  
  throw Error(`Failed to parse request for url: ${r.url}`)
};