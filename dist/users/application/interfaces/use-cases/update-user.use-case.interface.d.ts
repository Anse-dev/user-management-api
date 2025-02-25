import { UseCase } from 'src/core/application/interface/use-cases/use-case.interface';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UserResponseDto } from '../../dtos/user-response.dto';
export type UpdateUserInput = {
    id: string;
    data: UpdateUserDto;
};
export interface UpdateUserUseCaseInterface extends UseCase<UpdateUserInput, UserResponseDto> {
}
