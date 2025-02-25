import { Test } from '@nestjs/testing';
import { GetAllUsersUseCase } from '../../../src/users/application/use-cases/get-all-users.use-case';

describe('GetAllUsersUseCase', () => {
  let getAllUsersUseCase: GetAllUsersUseCase;
  let userRepositoryMock: any;

  beforeEach(async () => {
    // Créer un mock du repository
    userRepositoryMock = {
      findAll: jest.fn(),
    };

    // Configurer le module de test
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetAllUsersUseCase,
        {
          provide: 'UserRepositoryInterface',
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    getAllUsersUseCase = moduleRef.get<GetAllUsersUseCase>(GetAllUsersUseCase);
  });

  it('should return all users without passwords', async () => {
    // Arrange
    const users = [
      {
        id: 'uuid-1',
        login: 'user1',
        password: 'hashed_password_1',
        lastName: 'User1',
        firstName: 'Test',
        email: 'user1@example.com',
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
        password: 'hashed_password_2',
        lastName: 'User2',
        firstName: 'Test',
        email: 'user2@example.com',
        phone: '+33987654321',
        address: '456 Side St',
        postalCode: '69001',
        city: 'Lyon',
        country: 'France',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    userRepositoryMock.findAll.mockResolvedValue(users);

    // Act
    const result = await getAllUsersUseCase.execute();

    // Assert
    expect(userRepositoryMock.findAll).toHaveBeenCalled();
    expect(result.length).toBe(2);
    expect(result[0]).not.toHaveProperty('password');
    expect(result[1]).not.toHaveProperty('password');
    expect(result[0].id).toBe('uuid-1');
    expect(result[1].id).toBe('uuid-2');
  });

  it('should return an empty array when no users exist', async () => {
    // Arrange
    userRepositoryMock.findAll.mockResolvedValue([]);

    // Act
    const result = await getAllUsersUseCase.execute();

    // Assert
    expect(userRepositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
