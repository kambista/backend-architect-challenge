import { ConversionSourceEnum } from '../conversion-source.enum';
import { CurrencyEnum } from '../currency.enum';

export interface ProviderConversionEntity {
  compra: number;
  venta: number;
  origen: ConversionSourceEnum;
  moneda: CurrencyEnum;
  fecha: string;
}
