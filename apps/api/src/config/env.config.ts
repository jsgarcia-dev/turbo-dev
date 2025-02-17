import { z } from 'zod';

const envSchema = z.object({
  // API
  PORT: z.string().default('3001'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  // API Prefix
  API_PREFIX: z.string().default('api'),

  // Swagger
  SWAGGER_PATH: z.string().default('docs'),

  // Rate Limiting
  THROTTLE_TTL: z.string().transform(Number).default('60000'),
  THROTTLE_LIMIT: z.string().transform(Number).default('100'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export const validateEnv = () => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    );
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
};
