import { API_URL } from "@/lib/api";

function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminToken");
}

export function setAdminSession(token: string, admin: any) {
  localStorage.setItem("adminToken", token);
  localStorage.setItem("adminUser", JSON.stringify(admin));
}

export function getAdminUser() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("adminUser");
  return stored ? JSON.parse(stored) : null;
}

export function clearAdminSession() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  isForm?: boolean;
}

export async function adminApiRequest(path: string, options: RequestOptions = {}) {
  const { method = "GET", body, isForm = false } = options;
  const headers: Record<string, string> = {};
  if (!isForm) headers["Content-Type"] = "application/json";

  const token = getAdminToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
