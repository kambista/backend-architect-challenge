import { ExchangeEntity } from '../../domain/exchange.entity';
import { CurrencyEnum } from '../../domain/currency.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseExchangeDto implements Partial<ExchangeEntity> {
  @ApiProperty({ example: '65c3082df6ddc269272b58c0' })
  public id: string;

  @ApiProperty({ enum: CurrencyEnum, example: CurrencyEnum.USD })
  public monedaOrigen: CurrencyEnum;

  @ApiProperty({ enum: CurrencyEnum, example: CurrencyEnum.PEN })
  monedaDestino: CurrencyEnum;

  @ApiProperty({ example: 100 })
  monto: number;

  @ApiProperty({ example: 373.3 })
  montoCambiado: number;

  @ApiProperty({ example: 3.733 })
  tipoCambio: number;

  @ApiProperty()
  fecha: Date;

  constructor(data: {
    id: string;
    monedaOrigen: CurrencyEnum;
    monedaDestino: CurrencyEnum;
    monto: number;
    montoCambiado: number;
    tipoCambio: number;
    fecha: Date;
  }) {
    this.id = data.id;
    this.monedaOrigen = data.monedaOrigen;
    this.monedaDestino = data.monedaDestino;
    this.monto = data.monto;
    this.montoCambiado = data.montoCambiado;
    this.tipoCambio = data.tipoCambio;
    this.fecha = data.fecha;
  }
}
