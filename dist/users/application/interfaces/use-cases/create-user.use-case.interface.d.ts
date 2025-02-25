import { UseCase } from 'src/core/application/interface/use-cases/use-case.interface';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserResponseDto } from '../../dtos/user-response.dto';
export interface CreateUserUseCaseInterface extends UseCase<CreateUserDto, UserResponseDto> {
}
