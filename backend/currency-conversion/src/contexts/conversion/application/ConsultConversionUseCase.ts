import { ConversionRepository } from '../domain/conversion.repository';
import { Logger } from './helpers/Logger';

export class ConsultConversionUseCase {
  constructor(
    private readonly conversionRepository: ConversionRepository,
    private readonly logger: Logger,
  ) {}

  async obtainCurrentConversion() {
    this.logger.log({
      layer: 'ConsultConversionUseCase',
      message: 'Se consulta currentConversion',
      method: 'obtainCurrentConversion',
    });
    const conversion =
      await this.conversionRepository.obtainCurrentConversion();
    if (!conversion) throw new Error('Not Found current conversion');
    return conversion;
  }
}
