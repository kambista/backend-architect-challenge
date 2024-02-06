import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const DBName = 'currency-exchange';
let mongod: MongoMemoryServer;

export const MongoBDConfiguration = (mongoUri: string) => {
  if (process.env.NODE_ENV == 'test') {
    return MongooseModule.forRootAsync({
      useFactory: async () => {
        mongod = await MongoMemoryServer.create();
        const mongoUri = mongod.getUri();
        return {
          uri: mongoUri,
          dbName: DBName,
          autoIndex: true,
          autoCreate: true,
        };
      },
    });
  } else
    return MongooseModule.forRoot(mongoUri, {
      dbName: DBName,
      autoIndex: true,
      autoCreate: true,
    });
};
