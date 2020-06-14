import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as SuperTest from 'supertest';
import { AppModule } from '../../app.module';
import {
  SUCCESSFULL_LOGIN_REQUEST,
  FAILED_REGISTER_REQUEST,
  FAILED_LOGIN_REQUEST,
  SUCCESSFULL_REGISTER_REQUEST,
} from './auth.test.fixture';

chai.use(chaiAsPromised);
let sandbox: sinon.SinonSandbox;
const expect = chai.expect;
let request: SuperTest.SuperTest<SuperTest.Test>;
describe('Auth tests', () => {
  let app: INestApplication;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  before(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
    request = SuperTest(app.getHttpServer());
  });
  describe('Auth flow', () => {
    it('should register new user', async () => {
      const response = await request
        .post('/api/auth/register')
        .send(SUCCESSFULL_REGISTER_REQUEST)
        .expect(201);

      const result = response.body;

      expect(result).to.be.an('object');
      expect(result.token).to.be.a('string');
      expect(result.createdAt).to.be.a('string');
    });

    it('should throw error because of email duplication', async () => {
      await request
        .post('/api/auth/register')
        .send(FAILED_REGISTER_REQUEST)
        .expect(500);
    });

    it('should login user', async () => {
      const response = await request
        .post('/api/auth/login')
        .send(SUCCESSFULL_LOGIN_REQUEST)
        .expect(201);

      const result = response.body;

      expect(result).to.be.an('object');
      expect(result.token).to.be.a('string');
    });

    it('login should fail (user not found)', async () => {
      await request
        .post('/api/auth/login')
        .send(FAILED_LOGIN_REQUEST)
        .expect(400);
    });

    it('should get user info', async () => {
      const { body: user } = await request.post('/api/auth/login').send(SUCCESSFULL_LOGIN_REQUEST);

      console.log(user);

      await request
        .get('/api/auth/profile')
        .set('authorization', user.token)
        .send()
        .expect(200);
    });

    it('get user info with fake token', async () => {
      await request
        .get('/api/auth/profile')
        .set('authorization', 'sdf')
        .send()
        .expect(422);
    });
  });
});
