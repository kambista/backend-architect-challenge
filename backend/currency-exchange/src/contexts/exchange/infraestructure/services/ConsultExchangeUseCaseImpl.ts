import { ExchangeMongoRepository } from '../repository/exchange.mongo.repository';
import { Injectable } from '@nestjs/common';
import { ConsultExchangeUseCase } from '../../application/ConsultExchangeUseCase';

@Injectable()
export class ConsultExchangeUseCaseImp extends ConsultExchangeUseCase {
  constructor(
    private readonly exchangeRepositoryImpl: ExchangeMongoRepository,
  ) {
    super(exchangeRepositoryImpl);
  }
}
