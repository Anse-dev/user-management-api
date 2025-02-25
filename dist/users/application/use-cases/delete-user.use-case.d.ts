import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { DeleteUserUseCaseInterface } from '../interfaces/use-cases/delete-user.use-case.interface';
export declare class DeleteUserUseCase implements DeleteUserUseCaseInterface {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryInterface);
    execute(id: string): Promise<boolean>;
}
