"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./infrastructure/adapters/user.controller");
const prisma_user_repository_1 = require("./infrastructure/repositories/prisma-user.repository");
const prisma_service_1 = require("../core/infrastructure/prisma/prisma.service");
const create_user_use_case_1 = require("./application/use-cases/create-user.use-case");
const get_all_users_use_case_1 = require("./application/use-cases/get-all-users.use-case");
const get_user_by_id_use_case_1 = require("./application/use-cases/get-user-by-id.use-case");
const update_user_use_case_1 = require("./application/use-cases/update-user.use-case");
const delete_user_use_case_1 = require("./application/use-cases/delete-user.use-case");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController],
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: 'UserRepositoryInterface',
                useClass: prisma_user_repository_1.PrismaUserRepository,
            },
            {
                provide: create_user_use_case_1.CreateUserUseCase,
                useFactory: (repository) => new create_user_use_case_1.CreateUserUseCase(repository),
                inject: ['UserRepositoryInterface'],
            },
            {
                provide: get_all_users_use_case_1.GetAllUsersUseCase,
                useFactory: (repository) => new get_all_users_use_case_1.GetAllUsersUseCase(repository),
                inject: ['UserRepositoryInterface'],
            },
            {
                provide: get_user_by_id_use_case_1.GetUserByIdUseCase,
                useFactory: (repository) => new get_user_by_id_use_case_1.GetUserByIdUseCase(repository),
                inject: ['UserRepositoryInterface'],
            },
            {
                provide: update_user_use_case_1.UpdateUserUseCase,
                useFactory: (repository) => new update_user_use_case_1.UpdateUserUseCase(repository),
                inject: ['UserRepositoryInterface'],
            },
            {
                provide: delete_user_use_case_1.DeleteUserUseCase,
                useFactory: (repository) => new delete_user_use_case_1.DeleteUserUseCase(repository),
                inject: ['UserRepositoryInterface'],
            },
        ],
        exports: [
            create_user_use_case_1.CreateUserUseCase,
            get_all_users_use_case_1.GetAllUsersUseCase,
            get_user_by_id_use_case_1.GetUserByIdUseCase,
            update_user_use_case_1.UpdateUserUseCase,
            delete_user_use_case_1.DeleteUserUseCase,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map