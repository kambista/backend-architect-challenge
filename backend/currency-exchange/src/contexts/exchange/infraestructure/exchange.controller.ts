import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { RegisterExchangeUseCaseImp } from './services/RegisterExchangeUseCaseImpl';
import { ConsultExchangeUseCaseImp } from './services/ConsultExchangeUseCaseImpl';
import { IsDateISOStringValid } from '../../shared/helpers/IsDateISOStringValid';

@Controller('exchanges')
export class ExchangeController {
  constructor(
    private readonly registerExchangeUseCase: RegisterExchangeUseCaseImp,
    private readonly consultExchangeUseCase: ConsultExchangeUseCaseImp,
  ) {}

  @Post()
  async registerExchange(@Body() createExchange: CreateExchangeDto) {
    return await this.registerExchangeUseCase.registerExchange(createExchange);
  }

  @Get()
  listExchange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (
      !startDate ||
      !endDate ||
      !IsDateISOStringValid(startDate) ||
      !IsDateISOStringValid(endDate)
    )
      throw new BadRequestException('Envie Date valido en millis');

    const start = new Date(startDate);
    const end = new Date(endDate);

    return this.consultExchangeUseCase.obtainExchanges(start, end);
  }
}
