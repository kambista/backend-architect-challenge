import { ExchangeRepository } from '../domain/exchange.repository';
import { CreateExchangeDto } from '../infraestructure/dto/create-exchange.dto';
import { ExchangeEntity } from '../domain/exchange.entity';
import { ConversionRepository } from '../domain/conversion.repository';
import { GeneratorId } from './helpers/GeneratorId';
import { CurrencyEnum } from '../domain/currency.enum';
import { ConversionEntity } from '../domain/conversion.entity';
import { Logger } from './helpers/Logger';

export class RegisterExchangeUseCase {
  constructor(
    private readonly exchangeRepository: ExchangeRepository,
    private readonly conversionRepository: ConversionRepository,
    private readonly logger: Logger,
    private readonly generatorId: GeneratorId,
  ) {}

  async registerExchange(data: CreateExchangeDto): Promise<ExchangeEntity> {
    this.logger.log({
      layer: 'RegisterExchangeUseCase',
      message: 'start register exchange',
      method: 'registerExchange',
    });

    if (!this.idValidOperation(data)) throw Error('Operation Invalid');

    const conversion = await this.conversionRepository.obtainConversion();
    this.logger.log({
      layer: 'RegisterExchangeUseCase',
      message: 'Se obtuvo conversion',
      method: 'registerExchange',
      transaction: {
        conversion,
      },
    });

    const { tipoCambio, montoCambiado } = this.getTipoCambio(
      data.monedaOrigen,
      data.monedaDestino,
      conversion,
      data.monto,
    );
    if (!tipoCambio) throw new Error('Convertion not handled');

    const exchange = await this.exchangeRepository.saveRequestCurrencyExchange({
      monedaOrigen: data.monedaOrigen,
      fecha: new Date(),
      id: this.generatorId.newId(),
      createdAt: new Date(),
      monto: data.monto,
      monedaDestino: data.monedaDestino,
      montoCambiado,
      tipoCambio,
      updatedAt: new Date(),
      conversionId: conversion.id,
    });
    this.logger.log({
      layer: 'RegisterExchangeUseCase',
      message: 'finish register exchange',
      method: 'registerExchange',
    });
    return exchange;
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
    monto: number,
  ): { tipoCambio: number; montoCambiado: number } {
    if (
      currencyOrigin == CurrencyEnum.PEN &&
      currencyDestiny == CurrencyEnum.USD
    ) {
      return {
        tipoCambio: conversion.venta,
        montoCambiado: Math.round((monto / conversion.venta) * 1000) / 1000,
      };
    }
    if (
      currencyOrigin == CurrencyEnum.USD &&
      currencyDestiny == CurrencyEnum.PEN
    ) {
      return {
        tipoCambio: conversion.compra,
        montoCambiado: monto * conversion.compra,
      };
    }

    throw new Error('Conversion currency not handled');
  }
}
