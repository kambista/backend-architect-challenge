import { ConversionRepository } from '../domain/conversion.repository';
import { GeneratorId } from './helpers/GeneratorId';
import { ConversionEntity } from '../domain/conversion.entity';
import { Conversion } from '../infraestructure/model/conversion.schema';
import { ProviderConversionRepository } from '../domain/provider-conversion/provider-conversion.repository';

export class RegisterConversionFromProviderUseCase {
  constructor(
    private readonly conversionRepository: ConversionRepository,
    private readonly providerConversion: ProviderConversionRepository,
    private readonly generatorId: GeneratorId,
  ) {}

  async obtainConversionFromSunatAndRegister(): Promise<ConversionEntity> {
    const conversionProvider = await this.providerConversion.obtainConversion();
    return this.conversionRepository.saveConversion({
      ...conversionProvider,
      id: this.generatorId.newId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
