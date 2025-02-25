import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { UserResponseDto } from '../dtos/user-response.dto';
import { GetUserByIdUseCaseInterface } from '../interfaces/use-cases/get-user-by-id.use-case.interface';
export declare class GetUserByIdUseCase implements GetUserByIdUseCaseInterface {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryInterface);
    execute(id: string): Promise<UserResponseDto>;
}
