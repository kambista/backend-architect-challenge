import { ConversionSourceEnum } from '../../src/contexts/exchange/domain/conversion-source.enum';
import { CurrencyEnum } from '../../src/contexts/exchange/domain/currency.enum';

export const ConversionHttpRepositoryMock = {
  obtainConversion: jest.fn(() => ({
    id: '152354848',
    compra: 3.733,
    venta: 3.739,
    origen: ConversionSourceEnum.SUNAT,
    moneda: CurrencyEnum.USD,
    fecha: '2024-01-18',
  })),
};
