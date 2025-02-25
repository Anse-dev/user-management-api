import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { UserResponseDto } from '../../application/dtos/user-response.dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
export declare class UserController {
    private readonly createUserUseCase;
    private readonly getAllUsersUseCase;
    private readonly getUserByIdUseCase;
    private readonly updateUserUseCase;
    private readonly deleteUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase, getAllUsersUseCase: GetAllUsersUseCase, getUserByIdUseCase: GetUserByIdUseCase, updateUserUseCase: UpdateUserUseCase, deleteUserUseCase: DeleteUserUseCase);
    createUser(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    getAllUsers(): Promise<UserResponseDto[]>;
    getUserById(id: string): Promise<UserResponseDto>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    deleteUser(id: string): Promise<void>;
}
