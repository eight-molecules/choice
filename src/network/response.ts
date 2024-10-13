export const parse = async <T>(result: Promise<Response> | Response) => {
  const r = (await result) as Response;
  
  if (r.body && r.body.locked === false && r.bodyUsed === false) {
    const result = await r.json();
    return result as T;
  } else if ((r.body instanceof ReadableStream) === false) {
    return await r.text();
  }
};