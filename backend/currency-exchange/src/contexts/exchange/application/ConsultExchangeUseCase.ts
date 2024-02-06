import { ExchangeRepository } from '../domain/exchange.repository';

export class ConsultExchangeUseCase {
  constructor(private readonly exchangeRepository: ExchangeRepository) {}

  obtainExchanges(startDate: Date, endDate: Date) {
    return this.exchangeRepository.obtainHistoryRequestCurrencyExchange(
      startDate,
      endDate,
    );
  }
}
