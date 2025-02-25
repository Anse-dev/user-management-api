import { Test } from '@nestjs/testing';
import { PrismaUserRepository } from '../../../src/users/infrastructure/repositories/prisma-user.repository';
import { PrismaService } from '../../../src/core/infrastructure/prisma/prisma.service';

describe('PrismaUserRepository', () => {
  let repository: PrismaUserRepository;
  let prismaService: any;

  beforeEach(async () => {
    // Mock du PrismaService
    prismaService = {
      user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaUserRepository,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    repository = moduleRef.get<PrismaUserRepository>(PrismaUserRepository);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userData = {
        login: 'testuser',
        password: 'hashedpassword',
        lastName: 'Doe',
        firstName: 'John',
        email: 'john.doe@example.com',
        phone: '+33123456789',
        address: '123 Main St',
        postalCode: '75001',
        city: 'Paris',
        country: 'France',
      };

      const createdUserData = {
        id: 'uuid-1234',
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaService.user.create.mockResolvedValue(createdUserData);

      
      const result = await repository.create(userData);

     
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: userData,
      });
      expect(result).toEqual(createdUserData);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        {
          id: 'uuid-1',
          login: 'user1',
          password: 'hashedpassword1',
          lastName: 'Doe',
          firstName: 'John',
          email: 'john.doe@example.com',
          phone: '+33123456789',
          address: '123 Main St',
          postalCode: '75001',
          city: 'Paris',
          country: 'France',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'uuid-2',
          login: 'user2',
          password: 'hashedpassword2',
          lastName: 'Smith',
          firstName: 'Jane',
          email: 'jane.smith@example.com',
          phone: '+33987654321',
          address: '456 Other St',
          postalCode: '69001',
          city: 'Lyon',
          country: 'France',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prismaService.user.findMany.mockResolvedValue(users);

      
      const result = await repository.findAll();

      
      expect(prismaService.user.findMany).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });


});
