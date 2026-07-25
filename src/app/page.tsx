import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/auth-cookie";
import { LandingPage } from "@/components/landing/landing-page";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (token) {
    redirect("/chat");
  }

  return <LandingPage />;
}
