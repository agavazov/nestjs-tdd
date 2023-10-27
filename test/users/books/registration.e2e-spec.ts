import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('Users / Registration (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Must fail to register because the email is empty', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/registration')
      .set('Content-type', 'application/json')
      .send({
        email: '',
        password: 'Te$t',
      });

    expect(res.statusCode).toBe(400);
    expect(typeof res.body?.id).toBe('undefined');

    createdId = res.body.id;
  });

  it('Must fail to register because the email is empty', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/registration')
      .set('Content-type', 'application/json')
      .send({
        email: 'test@user.com',
        password: '',
      });

    expect(res.statusCode).toBe(400);
    expect(typeof res.body?.id).toBe('undefined');

    createdId = res.body.id;
  });

  it('Must successfully create a new user', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/registration')
      .set('Content-type', 'application/json')
      .send({
        email: 'test@user.com',
        password: 'Te$t',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(typeof res.body?.id).toBe('string');

    createdId = res.body.id;
  });

  it('Must return the created record', async () => {
    const res = await request(app.getHttpServer()).get(`/users/${createdId}`);

    expect(res.body?.id).toBe(createdId);
  });
});
