import { HashService } from '@app/adapters';
import { AuthService } from '@infra/auth/auth.service';
import { jwtConstants } from '@infra/auth/constants';
import { JwtStrategy } from '@infra/auth/jwt.strategy';
import { LocalStrategy } from '@infra/auth/local.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MockedDatabaseModule } from '../repositories/mockedDatabase.module';
import { InMemoryHashService } from './InMemoryHashService';

@Module({
  imports: [
    PassportModule,
    MockedDatabaseModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HashService,
      useClass: InMemoryHashService,
    },
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class MockedAuthModule {}
