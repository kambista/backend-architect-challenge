import { ConversionRepository } from '../../domain/conversion.repository';
import { ConversionEntity } from '../../domain/conversion.entity';

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as process from 'process';
import { TracerImpl } from '../../../shared/conf/TraceImpl';

@Injectable()
export class ConversionHttpRepository implements ConversionRepository {
  constructor(private readonly tracer: TracerImpl) {}
  async obtainConversion(): Promise<ConversionEntity> {
    console.log('htttp');
    const { data } = await axios.get(
      process.env.SERVICE_CONVERSION_URL + '/conversions',
      {
        headers: {
          traceid: this.tracer.getTrace(),
        },
      },
    );
    return data;
  }
}
