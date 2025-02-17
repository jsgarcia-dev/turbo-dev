"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <Button variant="destructive" onClick={handleLogout} className="w-full">
      Sair
    </Button>
  );
}
