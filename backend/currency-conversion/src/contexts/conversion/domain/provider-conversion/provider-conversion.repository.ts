import { ProviderConversionEntity } from './provider-conversion.entity';

export interface ProviderConversionRepository {
  obtainConversion(): Promise<ProviderConversionEntity>;
}
