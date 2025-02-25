import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/adapters/user.controller';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { PrismaService } from '../core/infrastructure/prisma/prisma.service';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: 'UserRepositoryInterface',
      useClass: PrismaUserRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repository) => new CreateUserUseCase(repository),
      inject: ['UserRepositoryInterface'],
    },
    {
      provide: GetAllUsersUseCase,
      useFactory: (repository) => new GetAllUsersUseCase(repository),
      inject: ['UserRepositoryInterface'],
    },
    {
      provide: GetUserByIdUseCase,
      useFactory: (repository) => new GetUserByIdUseCase(repository),
      inject: ['UserRepositoryInterface'],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (repository) => new UpdateUserUseCase(repository),
      inject: ['UserRepositoryInterface'],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (repository) => new DeleteUserUseCase(repository),
      inject: ['UserRepositoryInterface'],
    },
  ],
  exports: [
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}
