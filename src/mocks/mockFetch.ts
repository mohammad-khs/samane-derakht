import { getMockResponse } from "./mockSetup";

type OriginalFetch = typeof fetch;

let mockEnabled = false;

export function enableMocks() {
  mockEnabled = true;
}

export function disableMocks() {
  mockEnabled = false;
}

export function setupMockInterceptors() {
  if (typeof window === "undefined") return;

  const originalFetch = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    if (!mockEnabled) {
      return originalFetch(input, init);
    }

      const url = typeof input === "string" ? input : (input as Request).url;
    const method = init?.method || "GET";

    const mockData = getMockResponse(url, method);

    if (mockData !== null) {
      return new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return originalFetch(input, init);
  };

  return () => {
    window.fetch = originalFetch;
  };
}

export default { enableMocks, disableMocks, setupMockInterceptors };