import { GeneratorId } from '../../conversion/application/helpers/GeneratorId';
import * as mongoose from 'mongoose';
export class GeneratorMongoId implements GeneratorId {
  newId() {
    return new mongoose.Types.ObjectId().toString();
  }
}
