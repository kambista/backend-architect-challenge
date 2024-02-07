import { ExchangeRepository } from '../../domain/exchange.repository';
import { ExchangeEntity } from '../../domain/exchange.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Exchange } from '../model/exchange.schema';
import { Model } from 'mongoose';

export class ExchangeMongoRepository implements ExchangeRepository {
  constructor(
    @InjectModel(Exchange.name) private exchangeModel: Model<Exchange>,
  ) {}

  async obtainHistoryRequestCurrencyExchange(
    startDate: Date,
    endDate: Date,
  ): Promise<ExchangeEntity[]> {
    return this.exchangeModel.find({
      $and: [
        {
          createdAt: { $gte: startDate },
        },
        { createdAt: { $lte: endDate } },
      ],
    });
  }

  async saveRequestCurrencyExchange(
    data: ExchangeEntity,
  ): Promise<ExchangeEntity> {
    return await this.exchangeModel.create({ ...data, _id: data.id });
  }
}
