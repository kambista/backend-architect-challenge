import { Injectable } from '@nestjs/common';
import { Logger } from '../../exchange/application/helpers/Logger';
import * as pkg from 'package.json';
import { TracerImpl } from './TraceImpl';

@Injectable()
export class LoggerImpl implements Logger {
  constructor(private readonly tracerImpl: TracerImpl) {}
  log(data: {
    message: string;
    method: string;
    layer: string;
    transaction?: Record<string, any>;
  }) {
    console.log({
      project: pkg.name,
      version: pkg.version,
      traceId: this.tracerImpl.getTrace(),
      timestamp: new Date(),
      ...data,
    });
  }
}
