import { Controller, Get, Headers, OnModuleInit, Post } from '@nestjs/common';
import { RegisterConversionUseCaseImp } from './services/RegisterConversionUseCaseImpl';
import { ConsultConversionUseCaseImp } from './services/ConsultConversionUseCaseImpl';
import { ResponseConversionDto } from './dto/response-conversion.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TracerImpl } from '../../shared/conf/TraceImpl';
import { LoggerImpl } from '../../shared/conf/LoggerImpl';

@ApiTags('conversion')
@Controller('conversions')
export class ConversionController implements OnModuleInit {
  constructor(
    private readonly registerConversionUseCase: RegisterConversionUseCaseImp,
    private readonly consultConversionUseCase: ConsultConversionUseCaseImp,
    private readonly tracer: TracerImpl,
    private readonly logger: LoggerImpl,
  ) {}
  // Primera carga del proveedor sunat
  async onModuleInit() {
    await this.registerConversion();
  }

  /**
   *   TODO: Buscar solucion para activar la obtencion del TC de sunat cada 30s
   *   Se esta activando esta api con un cron de kubernetes (infra/cron.yaml) que se activa cada minuto, realizando
   *   dos llamadas con un tiempo intermedio de 30 segundos
   *
   *   Otra opcion con GCP scheduller activar una Cloud Function cada minuto. Esta cloud function al arrancar y luego de 30s
   *   publicara a un topico y esta funcion estara suscrita, logrando ejecutarse cada 30 s
   *
   * */

  @Post()
  @ApiResponse({ type: ResponseConversionDto, status: 201 })
  async registerConversion() {
    this.logger.log({
      layer: 'ConversionController',
      method: 'registerConversion',
      message: 'Se consultar TC a sunat y se almacenara',
    });
    const conversionEntity =
      await this.registerConversionUseCase.obtainConversionFromSunatAndRegister();
    return conversionEntity;
  }

  @ApiResponse({ type: ResponseConversionDto, isArray: true, status: 200 })
  @Get()
  async getCurrentConversion(@Headers('traceid') traceid: string) {
    if (traceid) this.tracer.setTrace(traceid);

    this.logger.log({
      layer: 'ConversionController',
      method: 'getCurrentConversion',
      message: 'Se consulta conversion',
    });

    return this.consultConversionUseCase.obtainCurrentConversion();
  }
}
