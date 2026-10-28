export const DEFAULT_API_URL = "http://localhost:8080";

type HelloResponse = { message: string };

// Calls GET /hello on the API and returns its message.
export async function fetchHello(
  baseUrl: string = import.meta.env.VITE_API_URL ?? DEFAULT_API_URL,
  fetchFn: typeof fetch = fetch,
): Promise<string> {
  const res = await fetchFn(`${baseUrl.replace(/\/+$/, "")}/hello`);
  if (!res.ok) {
    throw new Error(`GET /hello failed with status ${res.status}`);
  }
  const body = (await res.json()) as HelloResponse;
  return body.message;
}
