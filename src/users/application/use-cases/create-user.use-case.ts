import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { CreateUserUseCaseInterface } from '../interfaces/use-cases/create-user.use-case.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Vérifier si le login existe déjà
    const existingUserByLogin = await this.userRepository.findByLogin(
      createUserDto.login,
    );
    if (existingUserByLogin) {
      throw new ConflictException('Le login est déjà utilisé');
    }

    // Vérifier si l'email existe déjà
    const existingUserByEmail = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUserByEmail) {
      throw new ConflictException("L'email est déjà utilisé");
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Créer l'utilisateur avec le mot de passe hashé
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Retourner la réponse sans le mot de passe
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserResponseDto;
  }
}
