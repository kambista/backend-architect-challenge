import { ConversionRepository } from '../../domain/conversion.repository';
import { ConversionEntity } from '../../domain/conversion.entity';
import axios from 'axios';
import { ConversionSourceEnum } from '../../domain/conversion-source.enum';
import { CurrencyEnum } from '../../domain/currency.enum';

export class ConversionHttpRepository implements ConversionRepository {
  async obtainConversion(): Promise<ConversionEntity> {
    // const { data } = await axios.get('');
    return {
      compra: 3.733,
      venta: 3.739,
      origen: ConversionSourceEnum.SUNAT,
      moneda: CurrencyEnum.PEN,
      fecha: '2024-01-18',
    };
  }
}
