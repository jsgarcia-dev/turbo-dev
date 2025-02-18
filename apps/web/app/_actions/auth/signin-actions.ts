"use server";

import { auth } from "@/lib/auth";

import { loginSchema } from "@/schemas/index";

type SigninState = {
  error?: string;
  success?: string;
  redirect?: string;
  values?: {
    email?: string;
    password?: string;
  };
} | null;

export async function SigninAuth(prevState: SigninState, formData: FormData) {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    const fieldError = validatedFields.error.errors[0];
    return {
      error: `${fieldError.message} (${fieldError.path[0]})`,
      values,
    };
  }

  try {
    await auth.api.signInEmail({
      body: validatedFields.data,
    });

    return {
      success: "Login realizado com sucesso!",
      redirect: "/",
    };
  } catch {
    return {
      error: "Credenciais inválidas",
      values,
    };
  }
}
