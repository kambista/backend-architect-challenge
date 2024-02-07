import { ExchangeEntity } from '../../domain/exchange.entity';
import { CurrencyEnum } from '../../domain/currency.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'exchanges',
  autoIndex: true,
})
export class Exchange implements ExchangeEntity {
  @Prop()
  fecha: Date;

  @Prop({ unique: true, required: true })
  id: string;

  @Prop()
  monedaDestino: CurrencyEnum;

  @Prop()
  monedaOrigen: CurrencyEnum;

  @Prop()
  monto: number;

  @Prop()
  montoCambiado: number;

  @Prop()
  tipoCambio: number;

  @Prop()
  conversionId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

const ExchangeSchema = SchemaFactory.createForClass(Exchange);

export { ExchangeSchema };
