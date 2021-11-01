const http = async <T>(
  url: string,
  opts: RequestInit = {}
): Promise<T> => {
  opts.credentials = "include";
  const request = new Request(url, opts);
  const response: Response = await fetch(request);

  let res = null;
  if (response.ok) {
    res = await response.json();
  } else {
    const isJson = !!response.headers.get('Content-Type')?.startsWith('application/json');
    res = isJson ? await response.json() : await response.text();
  }
  return res as T;
}

export default http;
