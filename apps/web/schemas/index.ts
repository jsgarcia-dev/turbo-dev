import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email é obrigatório" }).email({
    message: "Por favor, insira um email válido",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres",
  }),
});

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().min(1, { message: "Email é obrigatório" }).email({
    message: "Por favor, insira um email válido",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres",
  }),
});
