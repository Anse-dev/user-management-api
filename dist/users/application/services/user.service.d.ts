import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserServiceInterface } from '../interfaces/user.service.interface';
export declare class UserService implements UserServiceInterface {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryInterface);
    createUser(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    getAllUsers(): Promise<UserResponseDto[]>;
    getUserById(id: string): Promise<UserResponseDto>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    deleteUser(id: string): Promise<boolean>;
    private mapToUserResponseDto;
}
