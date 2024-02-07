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
import { ResponseExchangeDto } from './dto/response-exchange.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('exchange')
@Controller('exchanges')
export class ExchangeController {
  constructor(
    private readonly registerExchangeUseCase: RegisterExchangeUseCaseImp,
    private readonly consultExchangeUseCase: ConsultExchangeUseCaseImp,
  ) {}

  @Post()
  @ApiResponse({ type: ResponseExchangeDto, status: 201 })
  async registerExchange(@Body() createExchange: CreateExchangeDto) {
    try {
      const exchange =
        await this.registerExchangeUseCase.registerExchange(createExchange);
      return new ResponseExchangeDto(exchange);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @ApiResponse({ type: ResponseExchangeDto, isArray: true, status: 200 })
  @ApiQuery({
    name: 'startDate',
    type: String,
    example: '2024-02-02T05:17:41.568Z',
  })
  @ApiQuery({
    name: 'endDate',
    type: String,
    example: '2024-02-10T05:17:41.568Z',
  })
  @Get()
  listExchange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    try {
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
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
