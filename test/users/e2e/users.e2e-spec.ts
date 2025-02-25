import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { PrismaService } from '../../../src/core/infrastructure/prisma/prisma.service';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    prismaService = app.get<PrismaService>(PrismaService);

    // Nettoyer la base de données avant les tests
    await prismaService.user.deleteMany({});

    await app.init();
  });

  afterAll(async () => {
    // Nettoyer la base de données après les tests
    await prismaService.user.deleteMany({});
    await app.close();
  });

  it('/users (POST) - should create a new user', async () => {
    const newUser = {
      login: 'e2etestuser',
      password: 'securePassword123',
      lastName: 'E2E',
      firstName: 'Test',
      email: 'e2e.test@example.com',
      phone: '+33123456789',
      address: '123 Test St',
      postalCode: '75001',
      city: 'Paris',
      country: 'France',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.login).toBe(newUser.login);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body).not.toHaveProperty('password');

    // Stocker l'ID pour les tests suivants
    const userId = response.body.id;

    // Test GET par ID
    await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(userId);
        expect(res.body.login).toBe(newUser.login);
      });

    // Test PUT
    const updateData = {
      firstName: 'Updated',
      phone: '+33987654321',
    };

    await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .send(updateData)
      .expect(200)
      .expect((res) => {
        expect(res.body.firstName).toBe(updateData.firstName);
        expect(res.body.phone).toBe(updateData.phone);
        expect(res.body.login).toBe(newUser.login); 
      });

    // Test GET all
    await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.some((user: any) => user.id === userId)).toBe(true);
      });

    // Test DELETE
    await request(app.getHttpServer()).delete(`/users/${userId}`).expect(204);

    // Vérifier que l'utilisateur est bien supprimé
    await request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
  });

  it('/users (POST) - should validate input data', async () => {
    const invalidUser = {
      login: '', 
      email: 'not-an-email', 
      lastName: 'Test',
      
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(invalidUser)
      .expect(400); 
  });

  it('/users (POST) - should prevent duplicate login', async () => {
    // Créer un premier utilisateur
    const firstUser = {
      login: 'duplicatelogintest',
      password: 'password123',
      lastName: 'First',
      firstName: 'User',
      email: 'first.user@example.com',
      address: '123 Main St',
      postalCode: '75001',
      city: 'Paris',
      country: 'France',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(firstUser)
      .expect(201);

    // Tenter de créer un second utilisateur avec le même login
    const secondUser = {
      login: 'duplicatelogintest', 
      password: 'anotherpassword',
      lastName: 'Second',
      firstName: 'User',
      email: 'second.user@example.com', 
      address: '456 Other St',
      postalCode: '69001',
      city: 'Lyon',
      country: 'France',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(secondUser)
      .expect(409); 
  });
});
