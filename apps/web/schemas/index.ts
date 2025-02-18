import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "O campo email é obrigatório" }),
  password: z.string().min(4, { message: "O campo senha é obrigatório" }),
});
