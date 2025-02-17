import { headers } from "next/headers";

import { LogoutButton } from "@/components/auth/logout-button";

import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const token = await auth.api.getToken({
    headers: await headers(),
  });

  if (!session && !token) {
    return null;
  }

  return (
    <div>
      <h2>Session:</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h2>Token:</h2>
      <pre>{JSON.stringify(token, null, 2)}</pre>
      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
}
