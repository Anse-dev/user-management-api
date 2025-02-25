import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { CreateUserUseCaseInterface } from '../interfaces/use-cases/create-user.use-case.interface';
export declare class CreateUserUseCase implements CreateUserUseCaseInterface {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryInterface);
    execute(createUserDto: CreateUserDto): Promise<UserResponseDto>;
}
