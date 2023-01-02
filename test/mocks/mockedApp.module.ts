import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MockedAuthModule } from './adapters/mockedAuth.module';
import { MockedHttpModule } from './adapters/mockedHttp.module';
import { MockedDatabaseModule } from './repositories/mockedDatabase.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MockedHttpModule,
    MockedDatabaseModule,
    MockedAuthModule,
  ],
})
export class MockedAppModule {}
