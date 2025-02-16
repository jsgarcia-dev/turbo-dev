import { Suspense } from "react";

import { UserList } from "@/components/users/user-list";

import { getUsers } from "@/services/user-api";

export default async function Home() {
  console.log("🏁 Iniciando renderização da página");

  try {
    const users = await getUsers();
    console.log("📊 Total de usuários:", users.length);

    return (
      <main className="container mx-auto py-10">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
            <p className="text-muted-foreground">
              Lista de todos os usuários do sistema
            </p>
          </div>

          <Suspense fallback={<div>Carregando usuários...</div>}>
            <UserList users={users} />
          </Suspense>
        </div>
      </main>
    );
  } catch (error) {
    console.error("❌ Erro na página:", error);
    return <div>Erro ao carregar usuários</div>;
  }
}
