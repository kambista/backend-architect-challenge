import { Module } from '@nestjs/common';
import { ContextModule } from './contexts/context.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://root:2YDauF37F933BsPE@clustersiseu.ne7j7i9.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'prueba_db',
        autoIndex: true,
        autoCreate: true,
      },
    ),
    ContextModule,
  ],
})
export class AppModule {}
