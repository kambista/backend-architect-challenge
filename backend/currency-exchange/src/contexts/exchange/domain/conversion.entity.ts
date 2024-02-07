import { CurrencyEnum } from './currency.enum';
import { ConversionSourceEnum } from './conversion-source.enum';

export interface ConversionEntity {
  compra: number;
  venta: number;
  origen: ConversionSourceEnum;
  moneda: CurrencyEnum;
  fecha: string;
  id: string;
}
