import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CurrencyEnum } from '../src/contexts/conversion/domain/currency.enum';

describe('ConversionController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /conversions', () => {
    test('Return data convertion valid', async () => {
      const response = await request(app.getHttpServer()).get('/conversions');

      expect(response.status).toBe(200);
      expect(Object.values(CurrencyEnum).includes(response.body.moneda)).toBe(
        true,
      );
      expect(response.body).toHaveProperty('fecha');
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('compra');
      expect(response.body).toHaveProperty('moneda');
      expect(response.body).toHaveProperty('origen');
    });
  });
});
