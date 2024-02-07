import { RegisterConversionFromProviderUseCase } from '../../application/RegisterConversionFromProviderUseCase';
import { ConversionMongoRepository } from '../repository/conversion.mongo.repository';
import { Injectable } from '@nestjs/common';
import { GeneratorMongoId } from '../../../shared/utils/GeneratorMongoId';
import { ProviderConversionSunatHttpRepository } from '../repository/provider-conversion-sunat.http.repository';

@Injectable()
export class RegisterConversionUseCaseImp extends RegisterConversionFromProviderUseCase {
  constructor(
    private readonly conversionRepositoryImpl: ConversionMongoRepository,
    private readonly providerConversionSunatImpl: ProviderConversionSunatHttpRepository,
  ) {
    super(
      conversionRepositoryImpl,
      providerConversionSunatImpl,
      new GeneratorMongoId(),
    );
  }
}
