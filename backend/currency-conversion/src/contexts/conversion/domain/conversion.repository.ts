import { ConversionEntity } from './conversion.entity';

export interface ConversionRepository {
  obtainCurrentConversion(): Promise<ConversionEntity>;
  saveConversion(conversion: ConversionEntity): Promise<ConversionEntity>;
}
