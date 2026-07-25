import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";
import { requireAuthToken } from "@/lib/auth-cookie";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = await requireAuthToken();
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const backendRes = await backendFetch(`/api/chat/sessions/${id}/messages`, { token });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = await requireAuthToken();
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.text();
  const backendRes = await backendFetch(`/api/chat/sessions/${id}/messages`, { method: "POST", body, token });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
