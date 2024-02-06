import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';

export const DBName = 'currency-exchange';
export const MongoBDConfiguration = () => {
  if (!process.env.MONGO_URI) throw new Error('Configure MONGO_URI');

  return MongooseModule.forRoot(process.env.MONGO_URI, {
    dbName: DBName,
    autoIndex: true,
    autoCreate: true,
  });
};
