import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

/**
 * E2E test for the EnrollmentController.
 *
 * Enrollment endpoints are protected by JWT authentication and role guards.
 * Without a valid token, the GET /enrollments endpoint should respond with
 * 401 Unauthorized. This test ensures that behaviour.
 */
describe('EnrollmentController (e2e)', () => {
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

  it('GET /enrollments without auth should return 401', async () => {
    await request(app.getHttpServer()).get('/enrollments').expect(401);
  });
});