import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

/**
 * E2E test for the PaymentController.
 *
 * This test spins up the Nest application using the AppModule and
 * sends an HTTP GET request to the /payments endpoint. The expectation
 * is that the endpoint returns a 200 status code and a JSON array as
 * the response body. Adjust this test as you implement authentication
 * or change the response shape of the endpoint.
 */
describe('PaymentController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Apply the same global pipes used in the main application
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /payments should return an array of payments', async () => {
    const response = await request(app.getHttpServer()).get('/payments').expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});