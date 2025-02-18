"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut();
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleLogout}
      className="w-full"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saindo...
        </>
      ) : (
        "Sair"
      )}
    </Button>
  );
}
