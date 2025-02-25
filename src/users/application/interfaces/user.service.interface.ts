import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

export interface UserServiceInterface {
  createUser(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  getAllUsers(): Promise<UserResponseDto[]>;
  getUserById(id: string): Promise<UserResponseDto>;
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
  deleteUser(id: string): Promise<boolean>;
}
