import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`, {
    next: {
      revalidate: 0, // Desabilita o cache do Next.js temporariamente
      tags: ["users"],
    },
    cache: "no-store", // Força o fetch a sempre buscar dados novos
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar usuários");
  }

  return response.json();
}
