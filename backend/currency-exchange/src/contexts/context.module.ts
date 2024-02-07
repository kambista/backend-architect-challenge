import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/infraestructure/exchange.module';
import { LoggerImpl } from './shared/conf/LoggerImpl';
import { TracerImpl } from './shared/conf/TraceImpl';

@Module({
  imports: [ExchangeModule],
  providers: [],
})
export class ContextModule {}
