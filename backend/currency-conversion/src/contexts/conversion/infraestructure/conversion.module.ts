import { Module } from '@nestjs/common';
import { ConversionController } from './conversion.controller';
import { RegisterConversionUseCaseImp } from './services/RegisterConversionUseCaseImpl';
import { ConversionMongoRepository } from './repository/conversion.mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversion, ConversionSchema } from './model/conversion.schema';
import { ConsultConversionUseCaseImp } from './services/ConsultConversionUseCaseImpl';
import { ProviderConversionSunatHttpRepository } from './repository/provider-conversion-sunat.http.repository';
import { LoggerImpl } from '../../shared/conf/LoggerImpl';
import { TracerImpl } from '../../shared/conf/TraceImpl';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Conversion.name,
        schema: ConversionSchema,
      },
    ]),
  ],
  controllers: [ConversionController],
  providers: [
    RegisterConversionUseCaseImp,
    ConsultConversionUseCaseImp,
    ConversionMongoRepository,
    ProviderConversionSunatHttpRepository,
    LoggerImpl,
    TracerImpl,
  ],
})
export class ConversionModule {}
