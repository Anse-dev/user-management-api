import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { UserResponseDto } from '../dtos/user-response.dto';
import { GetUserByIdUseCaseInterface } from '../interfaces/use-cases/get-user-by-id.use-case.interface';

@Injectable()
export class GetUserByIdUseCase implements GetUserByIdUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserResponseDto;
  }
}
