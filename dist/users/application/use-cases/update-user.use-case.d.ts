import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UpdateUserUseCaseInterface, UpdateUserInput } from '../interfaces/use-cases/update-user.use-case.interface';
export declare class UpdateUserUseCase implements UpdateUserUseCaseInterface {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryInterface);
    execute({ id, data }: UpdateUserInput): Promise<UserResponseDto>;
}
