import { Test } from '@nestjs/testing';
import { CreateUserUseCase } from '../../../src/users/application/use-cases/create-user.use-case';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Mock de bcrypt pour ne pas avoir à hacher réellement les mots de passe pendant les tests
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockImplementation(() => Promise.resolve('hashed_password')),
}));

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryMock: any;

  beforeEach(async () => {
    // Créer un mock du repository
    userRepositoryMock = {
      findByLogin: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    // Configurer le module de test avec le mock
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'UserRepositoryInterface',
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should create a user successfully', async () => {
    // Arrange
    const createUserDto = {
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

    const createdUser = {
      id: 'uuid-1234',
      ...createUserDto,
      password: 'hashed_password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Configure les mocks pour simuler un nouveau user
    userRepositoryMock.findByLogin.mockResolvedValue(null);
    userRepositoryMock.findByEmail.mockResolvedValue(null);
    userRepositoryMock.create.mockResolvedValue(createdUser);

    // Act
    const result = await createUserUseCase.execute(createUserDto);

    // Assert
    expect(userRepositoryMock.findByLogin).toHaveBeenCalledWith(
      createUserDto.login,
    );
    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
      createUserDto.email,
    );
    expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
    expect(userRepositoryMock.create).toHaveBeenCalledWith({
      ...createUserDto,
      password: 'hashed_password',
    });

    // Vérifier que le mot de passe n'est pas inclus dans la réponse
    expect(result).not.toHaveProperty('password');
    expect(result.id).toBe(createdUser.id);
    expect(result.login).toBe(createUserDto.login);
    expect(result.email).toBe(createUserDto.email);
  });

  it('should throw ConflictException when login already exists', async () => {
    // Arrange
    const createUserDto = {
      login: 'existinguser',
      password: 'password123',
      lastName: 'Existing',
      firstName: 'User',
      email: 'new.email@example.com',
      address: '123 Main St',
      postalCode: '75001',
      city: 'Paris',
      country: 'France',
    };

    // Configure le mock pour simuler un login déjà existant
    userRepositoryMock.findByLogin.mockResolvedValue({
      id: 'existing-id',
      login: 'existinguser',
      email: 'existing.email@example.com',
    });

    // Act & Assert
    await expect(createUserUseCase.execute(createUserDto)).rejects.toThrow(
      ConflictException,
    );
    expect(userRepositoryMock.findByLogin).toHaveBeenCalledWith(
      createUserDto.login,
    );
    expect(userRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw ConflictException when email already exists', async () => {
    // Arrange
    const createUserDto = {
      login: 'newuser',
      password: 'password123',
      lastName: 'New',
      firstName: 'User',
      email: 'existing.email@example.com',
      address: '123 Main St',
      postalCode: '75001',
      city: 'Paris',
      country: 'France',
    };

    // Configure les mocks pour simuler un email déjà existant
    userRepositoryMock.findByLogin.mockResolvedValue(null);
    userRepositoryMock.findByEmail.mockResolvedValue({
      id: 'existing-id',
      login: 'existinguser',
      email: 'existing.email@example.com',
    });

    // Act & Assert
    await expect(createUserUseCase.execute(createUserDto)).rejects.toThrow(
      ConflictException,
    );
    expect(userRepositoryMock.findByLogin).toHaveBeenCalledWith(
      createUserDto.login,
    );
    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
      createUserDto.email,
    );
    expect(userRepositoryMock.create).not.toHaveBeenCalled();
  });
});
