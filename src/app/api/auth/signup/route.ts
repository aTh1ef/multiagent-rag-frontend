import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/auth-cookie";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const backendRes = await backendFetch("/api/auth/signup", {
    method: "POST",
    body,
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  const res = NextResponse.json({ user: data.user }, { status: backendRes.status });
  res.cookies.set(AUTH_COOKIE_NAME, data.token, AUTH_COOKIE_OPTIONS);
  return res;
}
