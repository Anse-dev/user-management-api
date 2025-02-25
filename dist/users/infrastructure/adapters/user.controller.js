"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../../application/dtos/create-user.dto");
const update_user_dto_1 = require("../../application/dtos/update-user.dto");
const user_response_dto_1 = require("../../application/dtos/user-response.dto");
const create_user_use_case_1 = require("../../application/use-cases/create-user.use-case");
const get_all_users_use_case_1 = require("../../application/use-cases/get-all-users.use-case");
const get_user_by_id_use_case_1 = require("../../application/use-cases/get-user-by-id.use-case");
const update_user_use_case_1 = require("../../application/use-cases/update-user.use-case");
const delete_user_use_case_1 = require("../../application/use-cases/delete-user.use-case");
let UserController = class UserController {
    constructor(createUserUseCase, getAllUsersUseCase, getUserByIdUseCase, updateUserUseCase, deleteUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async createUser(createUserDto) {
        return this.createUserUseCase.execute(createUserDto);
    }
    async getAllUsers() {
        return this.getAllUsersUseCase.execute();
    }
    async getUserById(id) {
        return this.getUserByIdUseCase.execute(id);
    }
    async updateUser(id, updateUserDto) {
        return this.updateUserUseCase.execute({ id, data: updateUserDto });
    }
    async deleteUser(id) {
        await this.deleteUserUseCase.execute(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouvel utilisateur' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Utilisateur créé avec succès',
        type: user_response_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Login ou email déjà utilisé' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les utilisateurs' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des utilisateurs récupérée avec succès',
        type: [user_response_dto_1.UserResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un utilisateur par son ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Utilisateur récupéré avec succès',
        type: user_response_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un utilisateur' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Utilisateur mis à jour avec succès',
        type: user_response_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Login ou email déjà utilisé' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un utilisateur' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Utilisateur supprimé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [create_user_use_case_1.CreateUserUseCase,
        get_all_users_use_case_1.GetAllUsersUseCase,
        get_user_by_id_use_case_1.GetUserByIdUseCase,
        update_user_use_case_1.UpdateUserUseCase,
        delete_user_use_case_1.DeleteUserUseCase])
], UserController);
//# sourceMappingURL=user.controller.js.map