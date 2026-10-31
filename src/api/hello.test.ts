import { describe, expect, it, vi } from "vitest";
import { fetchHello } from "./hello";

const ok = (body: unknown) => new Response(JSON.stringify(body), { status: 200 });

describe("fetchHello", () => {
  it("returns the greeting from GET /hello", async () => {
    const fetchFn = vi.fn().mockResolvedValue(ok({ greeting: "Hello, World" }));
    await expect(fetchHello("http://api.test", fetchFn)).resolves.toBe("Hello, World");
    expect(fetchFn).toHaveBeenCalledWith("http://api.test/hello");
  });

  it("ignores a trailing slash in the base url", async () => {
    const fetchFn = vi.fn().mockResolvedValue(ok({ greeting: "Hello, World" }));
    await fetchHello("http://api.test/", fetchFn);
    expect(fetchFn).toHaveBeenCalledWith("http://api.test/hello");
  });

  it("throws when the API answers with an error status", async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response("", { status: 500 }));
    await expect(fetchHello("http://api.test", fetchFn)).rejects.toThrow("GET /hello failed with status 500");
  });
});
