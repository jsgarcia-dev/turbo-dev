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
import { Separator } from "../ui/separator";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { Social } from "./social";

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
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="mt-4 flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-10"
                    placeholder="********"
                  />
                </div>
              </div>
              {formState?.error && <FormError message={formState.error} />}
              {formState?.success && (
                <FormSuccess message={formState.success} />
              )}
              <Button type="submit" disabled={isPending}>
                {isPending ? "Criando conta..." : "Criar conta"}
              </Button>
              <div className="-mb-3 flex items-center justify-center overflow-hidden">
                <Separator className="bg-muted-foreground my-4" />
                <span className="px-2 text-sm text-nowrap">
                  Or continue with
                </span>
                <Separator className="bg-muted-foreground my-4" />
              </div>
              <Social isPending={isPending} />
            </div>
            <div className="mt-5 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="text-lime-500 underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
