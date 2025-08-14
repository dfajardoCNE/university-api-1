import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

/**
 * E2E test for the AcademicRecordController.
 *
 * Access to academic records requires JWT authentication and appropriate roles.
 * An unauthenticated request should be rejected with a 401 status code. This
 * test confirms that the guard is in place.
 */
describe('AcademicRecordController (e2e)', () => {
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

  it('GET /academic-records without auth should return 401', async () => {
    await request(app.getHttpServer()).get('/academic-records').expect(401);
  });
});