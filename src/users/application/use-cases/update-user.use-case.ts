import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { UserResponseDto } from '../dtos/user-response.dto';
import {
  UpdateUserUseCaseInterface,
  UpdateUserInput,
} from '../interfaces/use-cases/update-user.use-case.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute({ id, data }: UpdateUserInput): Promise<UserResponseDto> {
    // Vérifier si l'utilisateur existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Vérifier si le login est déjà utilisé par un autre utilisateur
    if (data.login) {
      const userWithSameLogin = await this.userRepository.findByLogin(
        data.login,
      );
      if (userWithSameLogin && userWithSameLogin.id !== id) {
        throw new ConflictException('Le login est déjà utilisé');
      }
    }

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (data.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(
        data.email,
      );
      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new ConflictException("L'email est déjà utilisé");
      }
    }

    // Hasher le nouveau mot de passe si fourni
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await this.userRepository.update(id, data);

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as UserResponseDto;
  }
}
