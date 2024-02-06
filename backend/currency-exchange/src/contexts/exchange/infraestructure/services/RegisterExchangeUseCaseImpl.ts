import { RegisterExchangeUseCase } from '../../application/RegisterExchangeUseCase';
import { ExchangeMongoRepository } from '../repository/exchange.mongo.repository';
import { Injectable } from '@nestjs/common';
import { ConversionHttpRepository } from '../repository/conversion.http.repository';
import { GeneratorMongoId } from '../../../shared/utils/GeneratorMongoId';

@Injectable()
export class RegisterExchangeUseCaseImp extends RegisterExchangeUseCase {
  constructor(
    private readonly exchangeRepositoryImpl: ExchangeMongoRepository,
    private readonly conversionRepositoryImpl: ConversionHttpRepository,
  ) {
    super(
      exchangeRepositoryImpl,
      conversionRepositoryImpl,
      new GeneratorMongoId(),
    );
  }
}
