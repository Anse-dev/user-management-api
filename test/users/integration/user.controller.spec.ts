import { Test } from '@nestjs/testing';
import { UserController } from '../../../src/users/infrastructure/adapters/user.controller';
import { CreateUserUseCase } from '../../../src/users/application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from '../../../src/users/application/use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from '../../../src/users/application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../../../src/users/application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../../src/users/application/use-cases/delete-user.use-case';
import { CreateUserDto } from '../../../src/users/application/dtos/create-user.dto';
import { UpdateUserDto } from '../../../src/users/application/dtos/update-user.dto';
import { UserResponseDto } from '../../../src/users/application/dtos/user-response.dto';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let createUserUseCase: CreateUserUseCase;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let getUserByIdUseCase: GetUserByIdUseCase;
  let updateUserUseCase: UpdateUserUseCase;
  let deleteUserUseCase: DeleteUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllUsersUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetUserByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
    getAllUsersUseCase = moduleRef.get<GetAllUsersUseCase>(GetAllUsersUseCase);
    getUserByIdUseCase = moduleRef.get<GetUserByIdUseCase>(GetUserByIdUseCase);
    updateUserUseCase = moduleRef.get<UpdateUserUseCase>(UpdateUserUseCase);
    deleteUserUseCase = moduleRef.get<DeleteUserUseCase>(DeleteUserUseCase);
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        login: 'testuser',
        password: 'password123',
        lastName: 'Doe',
        firstName: 'John',
        email: 'john.doe@example.com',
        phone: '+33123456789',
        address: '123 Main St',
        postalCode: '75001',
        city: 'Paris',
        country: 'France',
      };

      const expectedResponse: UserResponseDto = {
        id: 'uuid-1234',
        login: 'testuser',
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
      };

      jest
        .spyOn(createUserUseCase, 'execute')
        .mockResolvedValue(expectedResponse);

      // Act
      const result = await userController.createUser(createUserDto);

      // Assert
      expect(createUserUseCase.execute).toHaveBeenCalledWith(createUserDto);
      expect(result).toBe(expectedResponse);
    });

    it('should propagate exceptions from the use case', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        login: 'testuser',
        password: 'password123',
        lastName: 'Doe',
        firstName: 'John',
        email: 'john.doe@example.com',
        phone: '+33123456789',
        address: '123 Main St',
        postalCode: '75001',
        city: 'Paris',
        country: 'France',
      };

      jest
        .spyOn(createUserUseCase, 'execute')
        .mockRejectedValue(new ConflictException('Login already exists'));

      // Act & Assert
      await expect(userController.createUser(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(createUserUseCase.execute).toHaveBeenCalledWith(createUserDto);
    });
  });

  // Autres tests pour les autres méthodes du contrôleur...
});
