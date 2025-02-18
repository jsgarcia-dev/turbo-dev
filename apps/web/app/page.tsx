import { LogoutButton } from "@/components/auth/logout-button";

import { getAuthToken, getCurrentUser } from "@/lib/auth-utils";

export default async function Home() {
  const user = await getCurrentUser();
  const token = await getAuthToken();

  return (
    <div>
      <h2>Usuário Atual:</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <h2>Token JWT:</h2>
      <pre className="break-all">{token}</pre>

      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
}
