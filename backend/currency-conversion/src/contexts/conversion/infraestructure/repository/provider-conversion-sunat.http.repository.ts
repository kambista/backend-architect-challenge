import { ProviderConversionRepository } from '../../domain/provider-conversion/provider-conversion.repository';
import { ProviderConversionEntity } from '../../domain/provider-conversion/provider-conversion.entity';
import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProviderConversionSunatHttpRepository
  implements ProviderConversionRepository
{
  async obtainConversion(): Promise<ProviderConversionEntity> {
    const { data } = await axios.get(
      'https://api.apis.net.pe/v1/tipo-cambio-sunat',
    );
    return data as ProviderConversionEntity;
  }
}
