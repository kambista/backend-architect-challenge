import { ConversionEntity } from './conversion.entity';

export interface ConversionRepository {
  obtainConversion(): Promise<ConversionEntity>;
}
