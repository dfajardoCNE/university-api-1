import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

/**
 * E2E test for the AdministrativeStaffController.
 *
 * Since this endpoint is protected by JWT authentication and role guards, an
 * unauthenticated request should return a 401 Unauthorized status. This test
 * verifies that the guard is correctly applied.
 */
describe('AdministrativeStaffController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /administrative-staff without auth should return 401', async () => {
    await request(app.getHttpServer()).get('/administrative-staff').expect(401);
  });
});