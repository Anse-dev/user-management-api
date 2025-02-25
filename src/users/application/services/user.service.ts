import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserServiceInterface } from '../interfaces/user.service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
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
    return this.mapToUserResponseDto(user);
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.mapToUserResponseDto(user));
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return this.mapToUserResponseDto(user);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    // Vérifier si l'utilisateur existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Vérifier si le login est déjà utilisé par un autre utilisateur
    if (updateUserDto.login) {
      const userWithSameLogin = await this.userRepository.findByLogin(
        updateUserDto.login,
      );
      if (userWithSameLogin && userWithSameLogin.id !== id) {
        throw new ConflictException('Le login est déjà utilisé');
      }
    }

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (updateUserDto.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(
        updateUserDto.email,
      );
      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new ConflictException("L'email est déjà utilisé");
      }
    }

    // Hasher le nouveau mot de passe si fourni
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    return this.mapToUserResponseDto(updatedUser);
  }

  async deleteUser(id: string): Promise<boolean> {
    // Vérifier si l'utilisateur existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Supprimer l'utilisateur
    return this.userRepository.delete(id);
  }

  private mapToUserResponseDto(user: any): UserResponseDto {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
