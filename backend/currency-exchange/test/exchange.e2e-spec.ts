import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Scope } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ConversionHttpRepository } from '../src/contexts/exchange/infraestructure/repository/conversion.http.repository';
import { ConversionSourceEnum } from '../src/contexts/exchange/domain/conversion-source.enum';
import { CurrencyEnum } from '../src/contexts/exchange/domain/currency.enum';
import { ResponseExchangeDto } from '../src/contexts/exchange/infraestructure/dto/response-exchange.dto';
import { TracerImpl } from '../src/contexts/shared/conf/TraceImpl';

jest.mock('../src/contexts/shared/conf/LoggerImpl');

describe('ExchangeController (e2e)', () => {
  let app: INestApplication;

  let conversionHttpRepository: ConversionHttpRepository;

  const conversion = {
    id: '152354848',
    compra: 3.733,
    venta: 3.739,
    origen: ConversionSourceEnum.SUNAT,
    moneda: CurrencyEnum.USD,
    fecha: '2024-01-18',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TracerImpl) //override Scoped requestº
      .useValue({ log: jest.fn() })
      .compile();

    conversionHttpRepository = moduleFixture.get<ConversionHttpRepository>(
      ConversionHttpRepository,
    );

    jest
      .spyOn(conversionHttpRepository, 'obtainConversion')
      .mockImplementation(async () => {
        return conversion;
      });

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST /exchanges', () => {
    test('Convert USD to PEN', async () => {
      const dataToCreate = {
        monedaOrigen: 'USD',
        monedaDestino: 'PEN',
        monto: 100,
      };

      const response = await request(app.getHttpServer())
        .post('/exchanges')
        .send(dataToCreate);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(String),
        monedaOrigen: 'USD',
        monedaDestino: 'PEN',
        monto: 100,
        montoCambiado: 373.3,
        tipoCambio: 3.733,
        fecha: expect.any(String),
      });
    });

    test('Convert PEN to USD', async () => {
      const dataToCreate = {
        monedaOrigen: 'PEN',
        monedaDestino: 'USD',
        monto: 373.3,
      };

      const response = await request(app.getHttpServer())
        .post('/exchanges')
        .send(dataToCreate);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(String),
        monedaOrigen: 'PEN',
        monedaDestino: 'USD',
        monto: 373.3,
        montoCambiado: 99.84,
        tipoCambio: 3.739,
        fecha: expect.any(String),
      });
    });
  });

  describe('GET /exchanges', () => {
    const startDate = new Date();
    let dateBeetwenFirstAndSecon: Date;
    let endDate: Date;
    let exchange1: ResponseExchangeDto;
    let exchange2: ResponseExchangeDto;
    beforeEach(async () => {
      const dataToCreate1 = {
        monedaOrigen: 'USD',
        monedaDestino: 'PEN',
        monto: 100,
      };

      const response1 = await request(app.getHttpServer())
        .post('/exchanges')
        .send(dataToCreate1);
      exchange1 = response1.body;

      await new Promise((resolve) => {
        setTimeout(() => resolve(''), 2000);
      });
      dateBeetwenFirstAndSecon = new Date();
      await new Promise((resolve) => {
        setTimeout(() => resolve(''), 2000);
      });

      const dataToCreate2 = {
        monedaOrigen: 'PEN',
        monedaDestino: 'USD',
        monto: 373.3,
      };

      const response2 = await request(app.getHttpServer())
        .post('/exchanges')
        .send(dataToCreate2);
      exchange2 = response2.body;

      endDate = new Date();
    });

    test('Obtain between start and end Date ', async () => {
      const response = await request(app.getHttpServer())
        .get('/exchanges')
        .query({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        });

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(
        response.body.some((b: ResponseExchangeDto) => b.id == exchange1.id),
      );
      expect(
        response.body.some((b: ResponseExchangeDto) => b.id == exchange2.id),
      );
    });

    test('Obtain between start and middle date ', async () => {
      const response = await request(app.getHttpServer())
        .get('/exchanges')
        .query({
          startDate: startDate.toISOString(),
          endDate: dateBeetwenFirstAndSecon.toISOString(),
        });

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].id).toEqual(exchange1.id);
    });
  });
});
