"use server";

import { auth } from "@/lib/auth";

import { loginSchema } from "@/schemas/index";

type FormErrors =
  | {
      email?: string[];
      password?: string[];
      general?: string[];
    }
  | {
      email?: never;
      password?: never;
      general: string[];
    };

export type SigninState = {
  errors?: FormErrors;
  values?: {
    email?: string;
    password?: string;
  };
  success?: boolean;
  redirect?: string;
} | null;

export async function SigninAuth(prevState: SigninState, formData: FormData) {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values,
    };
  }

  try {
    await auth.api.signInEmail({
      body: validatedFields.data,
    });

    return {
      success: true,
      redirect: "/",
    };
  } catch {
    return {
      errors: {
        general: ["Credenciais inválidas ou conta não verificada"],
      },
      values,
    };
  }
}
