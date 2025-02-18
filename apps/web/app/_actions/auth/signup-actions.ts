"use server";

import { prisma } from "@repo/database";

import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth-client";

import { registerSchema } from "@/schemas/index";

type FormErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  general?: string[];
};

export type SignupState = {
  errors?: FormErrors;
  values?: {
    name?: string;
    email?: string;
    password?: string;
  };
  success?: boolean;
  redirect?: string;
} | null;

export async function SignupAuth(prevState: SignupState, formData: FormData) {
  const values = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values,
    };
  }

  try {
    const { email, password, name } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        errors: {
          email: ["Este email já está em uso"],
        },
        values,
      };
    }

    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    await signIn.email({
      email,
      password,
    });

    return {
      success: true,
      redirect: "/auth/sign-in",
    };
  } catch {
    return {
      errors: {
        general: ["Erro ao criar conta. Tente novamente."],
      },
      values,
    };
  }
}
