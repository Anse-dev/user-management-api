import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { UserResponseDto } from '../../application/dtos/user-response.dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Login ou email déjà utilisé' })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs récupérée avec succès',
    type: [UserResponseDto],
  })
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.getAllUsersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur" })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur récupéré avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.getUserByIdUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur" })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: 409, description: 'Login ou email déjà utilisé' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.updateUserUseCase.execute({ id, data: updateUserDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur" })
  @ApiResponse({ status: 204, description: 'Utilisateur supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }
}
