"use server";

import { z } from "zod";

import { auth } from "@/lib/auth";

const SigninSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type SigninState = {
  error?: string;
  success?: string;
  redirect?: string;
} | null;

export async function SigninAuth(prevState: SigninState, formData: FormData) {
  try {
    const validatedFields = SigninSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      console.error("Erro de validação:", validatedFields.error);
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const { email, password } = validatedFields.data;

    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });

      return {
        success: "Login realizado com sucesso!",
        redirect: "/",
      };
    } catch (signinError) {
      console.error("Erro ao fazer login:", signinError);
      return {
        error: "Credenciais inválidas",
      };
    }
  } catch (error) {
    console.error("Erro geral:", error);
    return {
      error: "Erro ao fazer login. Tente novamente.",
    };
  }
}
