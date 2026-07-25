import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendFetch } from "@/lib/backend";
import { AUTH_COOKIE_NAME } from "@/lib/auth-cookie";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const backendRes = await backendFetch("/api/auth/me", { token });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
