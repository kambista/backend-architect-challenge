import { ExchangeRepository } from '../domain/exchange.repository';
import { CreateExchangeDto } from '../infraestructure/dto/create-exchange.dto';
import { ExchangeEntity } from '../domain/exchange.entity';
import { ConversionRepository } from '../domain/conversion.repository';
import { GeneratorId } from './helpers/GeneratorId';
import { CurrencyEnum } from '../domain/currency.enum';
import { ConversionEntity } from '../domain/conversion.entity';

export class RegisterExchangeUseCase {
  constructor(
    private readonly exchangeRepository: ExchangeRepository,
    private readonly conversionRepository: ConversionRepository,
    private readonly generatorId: GeneratorId,
  ) {}

  async registerExchange(data: CreateExchangeDto): Promise<ExchangeEntity> {
    if (!this.idValidOperation(data)) throw Error('Operation Invalid');

    const conversion = await this.conversionRepository.obtainConversion();
    const tipoCambio = this.getTipoCambio(
      data.monedaOrigen,
      data.monedaDestino,
      conversion,
    );
    if (!tipoCambio) throw new Error('Convertion not handled');
    return await this.exchangeRepository.saveRequestCurrencyExchange({
      monedaOrigen: data.monedaOrigen,
      fecha: new Date(),
      id: this.generatorId.newId(),
      createdAt: new Date(),
      monto: data.monto,
      monedaDestino: data.monedaDestino,
      montoCambiado: data.monto * tipoCambio,
      tipoCambio,
      updatedAt: new Date(),
    });
  }
  private idValidOperation(data: CreateExchangeDto) {
    if (data.monedaOrigen == data.monedaDestino) return false;
    if (data.monto <= 0) return false;
    return true;
  }
  private getTipoCambio(
    currencyOrigin: CurrencyEnum,
    currencyDestiny: CurrencyEnum,
    conversion: ConversionEntity,
  ) {
    if (
      currencyOrigin == CurrencyEnum.PEN &&
      currencyDestiny == CurrencyEnum.USD
    ) {
      return conversion.venta;
    }
    if (
      currencyOrigin == CurrencyEnum.USD &&
      currencyDestiny == CurrencyEnum.PEN
    ) {
      return conversion.compra;
    }
  }
}
