import { UseCase } from 'src/core/application/interface/use-cases/use-case.interface';
import { UserResponseDto } from '../../dtos/user-response.dto';

export interface GetAllUsersUseCaseInterface
  extends UseCase<void, UserResponseDto[]> {}
