import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { appSetup } from '../src/app.setup';

describe('Store / Books / Update (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await appSetup(app);
    await app.init();
  });

  it('Must successfully create a new book', async () => {
    const res = await request(app.getHttpServer())
      .post('/store/books')
      .set('Content-type', 'application/json')
      .send({
        name: 'How to do e2e',
        description: 'Quick examples of how to do a testing in NestJS',
        price: 123,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(typeof res.body?.id).toBe('string');

    createdId = res.body.id;
  });

  it('Must successfully update existing book', async () => {
    const res = await request(app.getHttpServer())
      .put(`/store/books/${createdId}`)
      .set('Content-type', 'application/json')
      .send({
        name: 'How to update e2e',
        description: 'Quick examples of how to do update e2e',
        price: 543,
      });

    expect(res.statusCode).toBe(200);
  });

  it('Must return the updated record', async () => {
    const res = await request(app.getHttpServer()).get(
      `/store/books/${createdId}`,
    );

    expect(res.body).toHaveProperty('id');
    expect(typeof res.body?.id).toBe('string');
    expect(res.body?.name).toBe('How to update e2e');
    expect(res.body?.price).toBe(543);
  });
});
