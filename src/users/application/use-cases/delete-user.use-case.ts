import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { DeleteUserUseCaseInterface } from '../interfaces/use-cases/delete-user.use-case.interface';

@Injectable()
export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    // Vérifier si l'utilisateur existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Supprimer l'utilisateur
    return this.userRepository.delete(id);
  }
}
