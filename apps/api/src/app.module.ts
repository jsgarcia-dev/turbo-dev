import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { WinstonModule } from "nest-winston";
import { loggerConfig } from "./config/logger.config";
import { UsersModule } from "./modules/users/users.module";
import { validateEnv } from "./config/env.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      envFilePath: [".env", ".env.development.local"],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: process.env.THROTTLE_TTL
          ? parseInt(process.env.THROTTLE_TTL)
          : 60000,
        limit: process.env.THROTTLE_LIMIT
          ? parseInt(process.env.THROTTLE_LIMIT)
          : 100,
      },
    ]),
    WinstonModule.forRoot(loggerConfig),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
