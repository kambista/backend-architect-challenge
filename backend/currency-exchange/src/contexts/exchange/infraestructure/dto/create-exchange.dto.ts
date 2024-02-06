import { CurrencyEnum } from '../../domain/currency.enum';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';

export class CreateExchangeDto {
  @IsEnum(CurrencyEnum)
  monedaOrigen: CurrencyEnum;

  @IsEnum(CurrencyEnum)
  monedaDestino: CurrencyEnum;

  @IsNumber()
  @IsPositive()
  monto: number;
}
