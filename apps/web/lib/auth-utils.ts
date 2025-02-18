import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export type SessionUser = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  emailVerified: boolean;
  image: string | null;
};

export async function getAuthSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect("/auth/sign-in");
    }

    return session;
  } catch {
    redirect("/auth/sign-in");
  }
}

export async function getAuthToken() {
  try {
    const token = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      redirect("/auth/sign-in");
    }

    return token.token;
  } catch {
    redirect("/auth/sign-in");
  }
}

export async function getCurrentUser(): Promise<SessionUser> {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return session.user as SessionUser;
}
