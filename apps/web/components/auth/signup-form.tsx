"use client";

import { useEffect } from "react";
import { useActionState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Lock, Mail, User } from "lucide-react";

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

import { SignupAuth } from "@/app/_actions/auth/signup-actions";

import MyLogo from "../icons/my-logo";
import { Social } from "./social";

const hasError = (
  errors: Record<string, string[]> | undefined,
  field: string,
): boolean => {
  return Boolean(errors && field in errors && errors[field]?.length > 0);
};

const getErrorMessage = (
  errors: Record<string, string[]> | undefined,
  field: string,
): string | undefined => {
  return errors?.[field]?.[0];
};

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(SignupAuth, null);

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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-[450px]">
        <CardHeader className="items-center justify-center">
          <MyLogo className="h-12 w-12" />
          <CardTitle className="text-2xl">Crie uma conta</CardTitle>
          <CardDescription>
            Digite seus dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="mt-4 flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className={cn("pl-10", {
                      "border-destructive focus:ring-destructive": hasError(
                        formState?.errors,
                        "name",
                      ),
                    })}
                    defaultValue={formState?.values?.name}
                  />
                </div>
                {getErrorMessage(formState?.errors, "name") && (
                  <p className="text-destructive text-xs">
                    {getErrorMessage(formState?.errors, "name")}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exemplo@email.com"
                    className={cn("pl-10", {
                      "border-destructive focus:ring-destructive": hasError(
                        formState?.errors,
                        "email",
                      ),
                    })}
                    defaultValue={formState?.values?.email}
                  />
                </div>
                {getErrorMessage(formState?.errors, "email") && (
                  <p className="text-destructive text-xs">
                    {getErrorMessage(formState?.errors, "email")}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className={cn("pl-10", {
                      "border-destructive focus:ring-destructive": hasError(
                        formState?.errors,
                        "password",
                      ),
                    })}
                    defaultValue={formState?.values?.password}
                  />
                </div>
                {getErrorMessage(formState?.errors, "password") && (
                  <p className="text-destructive text-xs">
                    {getErrorMessage(formState?.errors, "password")}
                  </p>
                )}
              </div>
              {getErrorMessage(formState?.errors, "general") && (
                <p className="text-destructive text-center text-sm">
                  {getErrorMessage(formState?.errors, "general")}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Criando conta..." : "Criar conta"}
              </Button>
              <div className="-mb-3 flex items-center justify-center overflow-hidden">
                <div className="bg-muted-foreground/20 my-4 h-[1px] flex-1" />
                <span className="text-muted-foreground px-2 text-sm text-nowrap">
                  Ou continue com
                </span>
                <div className="bg-muted-foreground/20 my-4 h-[1px] flex-1" />
              </div>
              <Social isPending={isPending} />
              <div className="mt-5 text-center text-sm">
                Já tem uma conta?{" "}
                <Link
                  href="/auth/sign-in"
                  className="underline underline-offset-4"
                >
                  Entrar
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
