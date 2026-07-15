export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  isForm?: boolean;
  auth?: boolean;
}

export async function apiRequest(path: string, options: RequestOptions = {}) {
  const { method = "GET", body, isForm = false, auth = true } = options;

  const headers: Record<string, string> = {};
  if (!isForm) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export function imageUrl(path: string) {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  const base = API_URL.replace("/api", "");
  return `${base}${path}`;
}
