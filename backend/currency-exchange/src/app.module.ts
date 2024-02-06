import { Module } from '@nestjs/common';
import { ContextModule } from './contexts/context.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongoBDConfiguration } from './contexts/shared/conf/MongoBDConfiguration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoBDConfiguration(),
    ContextModule,
  ],
})
export class AppModule {}
