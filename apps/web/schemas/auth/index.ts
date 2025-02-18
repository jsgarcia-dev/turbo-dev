import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "O campo email é obrigatório")
    .email("Digite um email válido"),
  password: z
    .string()
    .min(1, "O campo senha é obrigatório")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type SignInValues = z.infer<typeof signInSchema>;
