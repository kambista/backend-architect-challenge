import { ConversionRepository } from '../../domain/conversion.repository';
import { ConversionEntity } from '../../domain/conversion.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Conversion } from '../model/conversion.schema';
import { Model } from 'mongoose';

export class ConversionMongoRepository implements ConversionRepository {
  constructor(
    @InjectModel(Conversion.name) private conversionModel: Model<Conversion>,
  ) {}

  async obtainCurrentConversion(): Promise<ConversionEntity> {
    return (await this.conversionModel
      .findOne()
      .sort({ createdAt: -1 })) as ConversionEntity;
  }

  async saveConversion(
    conversion: ConversionEntity,
  ): Promise<ConversionEntity> {
    return await this.conversionModel.create({
      ...conversion,
      _id: conversion.id,
    });
  }
}
