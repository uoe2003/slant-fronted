export class ApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly data?: unknown;

  constructor(status: number, statusText: string, data?: unknown) {
    super(`API Error: ${status} ${statusText}`);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

export type RequestOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined | null>;
};

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

/**
 * Serializes request payloads into appropriate BodyInit types.
 */
function formatBody(data?: unknown): BodyInit | undefined {
  if (data === undefined || data === null) return undefined;
  if (
    data instanceof FormData ||
    data instanceof Blob ||
    data instanceof ArrayBuffer ||
    typeof data === "string"
  ) {
    return data;
  }
  return JSON.stringify(data);
}

/**
 * Core fetch wrapper with parameter query string generation and authorization.
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, headers, body, ...rest } = options;

  const baseUrlClean = BASE_URL.replace(/\/$/, "");
  const endpointClean = endpoint.replace(/^\//, "");
  let url = `${baseUrlClean}/${endpointClean}`;

  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const requestHeaders = new Headers(headers);

  // Let browser set multipart boundary automatically when sending FormData
  if (!requestHeaders.has("Content-Type") && !(body instanceof FormData)) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token && !requestHeaders.has("Authorization")) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...rest,
    body,
    headers: requestHeaders,
  });

  if (response.status === 401 && typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:unauthorized"));
  }

  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }
    throw new ApiError(response.status, response.statusText, errorData);
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  // Parse text first to safely support empty 200/201 responses
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: formatBody(data),
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: formatBody(data),
    }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: formatBody(data),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
