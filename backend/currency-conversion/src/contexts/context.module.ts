import { Module } from '@nestjs/common';
import { ConversionModule } from './conversion/infraestructure/conversion.module';

@Module({
  imports: [ConversionModule],
})
export class ContextModule {}
