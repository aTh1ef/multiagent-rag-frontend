import { cookies } from "next/headers";
import { backendFetch } from "@/lib/backend";
import { AUTH_COOKIE_NAME } from "@/lib/auth-cookie";
import type { PublicUser } from "@/lib/types";

export async function getCurrentUser(): Promise<PublicUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const res = await backendFetch("/api/auth/me", { token });
  if (!res.ok) return null;
  return res.json();
}
