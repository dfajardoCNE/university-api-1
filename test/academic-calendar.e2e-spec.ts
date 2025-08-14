import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

/**
 * E2E test for the AcademicCalendarController.
 *
 * This controller is guarded with JWT authentication and role checks. The
 * expectation is that an unauthenticated request to the GET /academic-calendar
 * endpoint returns 401 Unauthorized.
 */
describe('AcademicCalendarController (e2e)', () => {
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

  it('GET /academic-calendar without auth should return 401', async () => {
    await request(app.getHttpServer()).get('/academic-calendar').expect(401);
  });
});