"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

import { SigninAuth } from "@/app/_actions/auth/signin-actions";

import MyLogo from "../icons/my-logo";
import { Social } from "./social";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(SigninAuth, null);

  useEffect(() => {
    if (formState?.success && formState?.redirect) {
      const timer = setTimeout(() => {
        router.push(formState.redirect!);
        router.refresh();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [formState, router]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="w-[450px]">
        <CardHeader className="items-center justify-center">
          <MyLogo className="h-12 w-12" />
          <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
          <CardDescription>
            Digite seu email e senha para entrar na sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="mt-4 flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    className={cn("pl-10", {
                      "border-destructive": formState?.error?.includes("email"),
                    })}
                  />
                </div>
                {formState?.error?.includes("email") && (
                  <p className="text-xs text-[#f31260]">
                    O campo email é obrigatório (email)
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-muted-foreground hover:text-primary text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={cn("pl-10", {
                      "border-destructive":
                        formState?.error?.includes("password"),
                    })}
                    placeholder="********"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-muted-foreground h-4 w-4" />
                    ) : (
                      <Eye className="text-muted-foreground h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formState?.error?.includes("password") && (
                  <p className="text-xs text-[#f31260]">
                    O campo senha é obrigatório (password)
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Entrando..." : "Entrar"}
              </Button>

              <div className="-mb-3 flex items-center justify-center overflow-hidden">
                <div className="bg-muted-foreground my-4 h-[1px] flex-1" />
                <span className="px-2 text-sm text-nowrap">
                  Ou continue com
                </span>
                <div className="bg-muted-foreground my-4 h-[1px] flex-1" />
              </div>

              <Social isPending={isPending} />

              <div className="mt-5 text-center text-sm">
                Não tem uma conta?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-lime-500 underline underline-offset-4"
                >
                  Criar conta
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
