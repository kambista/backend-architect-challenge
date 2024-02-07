import { Injectable, Scope } from '@nestjs/common';
import { Tracer } from '../../exchange/application/helpers/Tracer';
import { v4 } from 'uuid';

@Injectable({ scope: Scope.REQUEST })
export class TracerImpl implements Tracer {
  traceId: string;
  constructor() {
    this.traceId = v4().replace(new RegExp('-', 'g'), '');
  }
  getTrace(): string {
    return this.traceId;
  }
  setTrace(traceId: string) {
    this.traceId = traceId;
    return this.getTrace();
  }
}
