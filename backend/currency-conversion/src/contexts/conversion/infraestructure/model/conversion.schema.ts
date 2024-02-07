import { CurrencyEnum } from '../../domain/currency.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ConversionEntity } from '../../domain/conversion.entity';
import { ConversionSourceEnum } from '../../domain/conversion-source.enum';

@Schema({
  collection: 'exchanges',
  autoIndex: true,
})
export class Conversion implements ConversionEntity {
  @Prop()
  fecha: string;

  @Prop({ unique: true, required: true })
  id: string;

  @Prop()
  compra: number;

  @Prop()
  moneda: CurrencyEnum;

  @Prop()
  origen: ConversionSourceEnum;

  @Prop()
  venta: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

const ConversionSchema = SchemaFactory.createForClass(Conversion);

export { ConversionSchema };
