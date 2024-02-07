import { Injectable } from '@nestjs/common';
import { Logger } from '../../conversion/application/helpers/Logger';
import * as pkg from 'package.json';
import { TracerImpl } from './TraceImpl';

@Injectable()
export class LoggerImpl implements Logger {
  constructor(private readonly tracerImpl: TracerImpl) {}
  log(data: { message: string; method: string; layer: string }) {
    console.log({
      project: pkg.name,
      version: pkg.version,
      message: data.message,
      method: data.method,
      layer: data.layer,
      traceId: this.tracerImpl.getTrace(),
      timestamp: new Date(),
    });
  }
}
