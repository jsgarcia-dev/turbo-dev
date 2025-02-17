import { prisma } from "@repo/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { bearer, jwt, openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_URL,
  logger: {
    level: "debug",
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false,
      },
    },
  },
  plugins: [
    jwt({
      jwks: {
        keyPairConfig: {
          alg: "EdDSA",
          crv: "Ed25519",
        },
      },
      jwt: {
        expirationTime: "7d",
        issuer: process.env.NEXT_PUBLIC_URL,
        audience: process.env.NEXT_PUBLIC_URL,
      },
    }),
    bearer(),
    nextCookies(),
    openAPI(),
  ],
});
