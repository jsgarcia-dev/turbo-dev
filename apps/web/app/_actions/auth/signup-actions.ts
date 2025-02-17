"use server";

import { prisma } from "@repo/database";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth-client";

const SignupSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type SignupState = {
  error?: string;
  success?: string;
  redirect?: string;
} | null;

export async function SignupAuth(prevState: SignupState, formData: FormData) {
  try {
    const validatedFields = SignupSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      console.error("Erro de validação:", validatedFields.error);
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const { email, password, name } = validatedFields.data;

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("Usuário já existe:", email);
      return {
        error:
          "Oops houve um erro ao criar sua conta, tente novamente com outro email.",
      };
    }

    try {
      // Cria o usuário
      const newUser = await auth.api.signUpEmail({
        body: {
          email,
          password,
          name,
        },
      });
      console.log("Usuário criado:", newUser);

      // Faz o login
      await signIn.email({
        email,
        password,
      });

      return {
        success: "Conta criada com sucesso!",
        redirect: "/",
      };
    } catch (signupError) {
      console.error("Erro ao criar usuário:", signupError);
      throw signupError;
    }
  } catch (error) {
    console.error("Erro geral:", error);
    return {
      error: "Erro ao criar conta. Tente novamente.",
    };
  }
}
