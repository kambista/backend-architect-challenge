import { ExchangeEntity } from './exchange.entity';

export interface ExchangeRepository {
  saveRequestCurrencyExchange(data: ExchangeEntity): Promise<ExchangeEntity>;
  obtainHistoryRequestCurrencyExchange(
    startDate: Date,
    endDate: Date,
  ): Promise<ExchangeEntity[]>;
}
