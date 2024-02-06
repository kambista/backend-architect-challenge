import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/infraestructure/exchange.module';

@Module({
  imports: [ExchangeModule],
})
export class ContextModule {}
