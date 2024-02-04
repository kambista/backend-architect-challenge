import { Module } from '@nestjs/common';
import { ContextModule } from './contexts/context.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContextModule,
  ],
})
export class AppModule {}
