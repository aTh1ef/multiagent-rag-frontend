import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendFetch } from "@/lib/backend";
import { AUTH_COOKIE_NAME } from "@/lib/auth-cookie";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const backendRes = await backendFetch("/api/documents", { token });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const contentType = req.headers.get("content-type") ?? "";
  const body = await req.arrayBuffer();

  const backendRes = await backendFetch("/api/documents", {
    method: "POST",
    body,
    token,
    headers: { "Content-Type": contentType },
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
