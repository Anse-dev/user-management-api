import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { UserResponseDto } from '../dtos/user-response.dto';
import { GetAllUsersUseCaseInterface } from '../interfaces/use-cases/get-all-users.use-case.interface';
export declare class GetAllUsersUseCase implements GetAllUsersUseCaseInterface {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryInterface);
    execute(): Promise<UserResponseDto[]>;
}
