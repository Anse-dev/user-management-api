import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { UserResponseDto } from '../dtos/user-response.dto';
import { GetAllUsersUseCaseInterface } from '../interfaces/use-cases/get-all-users.use-case.interface';

@Injectable()
export class GetAllUsersUseCase implements GetAllUsersUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as UserResponseDto;
    });
  }
}
