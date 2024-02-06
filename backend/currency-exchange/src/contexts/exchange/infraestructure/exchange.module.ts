import { Module } from '@nestjs/common';
import { ExchangeController } from './exchange.controller';
import { RegisterExchangeUseCaseImp } from './services/RegisterExchangeUseCaseImpl';
import { ExchangeMongoRepository } from './repository/exchange.mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Exchange, ExchangeSchema } from './model/exchange.schema';
import { ConsultExchangeUseCaseImp } from './services/ConsultExchangeUseCaseImpl';
import { ConversionHttpRepository } from './repository/conversion.http.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Exchange.name,
        schema: ExchangeSchema,
      },
    ]),
  ],
  controllers: [ExchangeController],
  providers: [
    RegisterExchangeUseCaseImp,
    ConsultExchangeUseCaseImp,
    ExchangeMongoRepository,
    ConversionHttpRepository,
  ],
})
export class ExchangeModule {}
