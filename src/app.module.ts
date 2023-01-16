import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, DatabaseModule, AuthModule],
})
export class AppModule {}
