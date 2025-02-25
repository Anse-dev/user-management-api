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
exports.UpdateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let UpdateUserUseCase = class UpdateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ id, data }) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        if (data.login) {
            const userWithSameLogin = await this.userRepository.findByLogin(data.login);
            if (userWithSameLogin && userWithSameLogin.id !== id) {
                throw new common_1.ConflictException('Le login est déjà utilisé');
            }
        }
        if (data.email) {
            const userWithSameEmail = await this.userRepository.findByEmail(data.email);
            if (userWithSameEmail && userWithSameEmail.id !== id) {
                throw new common_1.ConflictException("L'email est déjà utilisé");
            }
        }
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const updatedUser = await this.userRepository.update(id, data);
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
};
exports.UpdateUserUseCase = UpdateUserUseCase;
exports.UpdateUserUseCase = UpdateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepositoryInterface')),
    __metadata("design:paramtypes", [Object])
], UpdateUserUseCase);
//# sourceMappingURL=update-user.use-case.js.map