const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://localhost:4000";

interface BackendFetchOptions extends RequestInit {
  token?: string;
}

export async function backendFetch(path: string, options: BackendFetchOptions = {}) {
  const { token, headers, ...rest } = options;

  const response = await fetch(`${BACKEND_API_URL}${path}`, {
    ...rest,
    headers: {
      ...(rest.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    cache: "no-store",
  });

  return response;
}
