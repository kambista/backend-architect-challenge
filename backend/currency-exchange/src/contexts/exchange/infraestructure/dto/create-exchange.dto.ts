import { CurrencyEnum } from '../../domain/currency.enum';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExchangeDto {
  @ApiProperty({ enum: CurrencyEnum, example: CurrencyEnum.USD })
  @IsEnum(CurrencyEnum)
  monedaOrigen: CurrencyEnum;

  @ApiProperty({ enum: CurrencyEnum, example: CurrencyEnum.PEN })
  @IsEnum(CurrencyEnum)
  monedaDestino: CurrencyEnum;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsPositive()
  monto: number;
}
