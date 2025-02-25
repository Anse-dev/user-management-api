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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(createUserDto) {
        const existingUserByLogin = await this.userRepository.findByLogin(createUserDto.login);
        if (existingUserByLogin) {
            throw new common_1.ConflictException('Le login est déjà utilisé');
        }
        const existingUserByEmail = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUserByEmail) {
            throw new common_1.ConflictException("L'email est déjà utilisé");
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.mapToUserResponseDto(user);
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users.map((user) => this.mapToUserResponseDto(user));
    }
    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        return this.mapToUserResponseDto(user);
    }
    async updateUser(id, updateUserDto) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        if (updateUserDto.login) {
            const userWithSameLogin = await this.userRepository.findByLogin(updateUserDto.login);
            if (userWithSameLogin && userWithSameLogin.id !== id) {
                throw new common_1.ConflictException('Le login est déjà utilisé');
            }
        }
        if (updateUserDto.email) {
            const userWithSameEmail = await this.userRepository.findByEmail(updateUserDto.email);
            if (userWithSameEmail && userWithSameEmail.id !== id) {
                throw new common_1.ConflictException("L'email est déjà utilisé");
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        const updatedUser = await this.userRepository.update(id, updateUserDto);
        return this.mapToUserResponseDto(updatedUser);
    }
    async deleteUser(id) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        return this.userRepository.delete(id);
    }
    mapToUserResponseDto(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepositoryInterface')),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=user.service.js.map