import { Module } from '@nestjs/common';
import { ContextModule } from './contexts/context.module';
import { ConfigModule } from '@nestjs/config';
import { MongoBDConfiguration } from './contexts/shared/conf/MongoBDConfiguration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoBDConfiguration(process.env.MONGO_URI!),
    ContextModule,
  ],
})
export class AppModule {}
