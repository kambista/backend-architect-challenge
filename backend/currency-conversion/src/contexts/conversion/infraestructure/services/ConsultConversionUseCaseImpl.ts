import { ConversionMongoRepository } from '../repository/conversion.mongo.repository';
import { Injectable } from '@nestjs/common';
import { ConsultConversionUseCase } from '../../application/ConsultConversionUseCase';
import { LoggerImpl } from '../../../shared/conf/LoggerImpl';

@Injectable()
export class ConsultConversionUseCaseImp extends ConsultConversionUseCase {
  constructor(
    private readonly conversionRepositoryImpl: ConversionMongoRepository,
    private readonly loggerImpl: LoggerImpl,
  ) {
    super(conversionRepositoryImpl, loggerImpl);
  }
}
