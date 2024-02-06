import { CurrencyEnum } from './currency.enum';

export interface ExchangeEntity {
  id: string;
  monedaOrigen: CurrencyEnum;
  monedaDestino: CurrencyEnum;
  monto: number;
  montoCambiado: number;
  tipoCambio: number;
  fecha: Date;

  createdAt: Date;
  updatedAt: Date;
}
