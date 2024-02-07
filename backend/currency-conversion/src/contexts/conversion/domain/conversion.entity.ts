import { CurrencyEnum } from './currency.enum';
import { ConversionSourceEnum } from './conversion-source.enum';

export interface ConversionEntity {
  id: string;
  compra: number;
  venta: number;
  origen: ConversionSourceEnum;
  moneda: CurrencyEnum;
  fecha: string;
  createdAt: Date;
  updatedAt: Date;
}
