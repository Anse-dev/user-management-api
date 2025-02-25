import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Login de l\'utilisateur' })
  @IsString()
  @IsOptional()
  login?: string;

  @ApiPropertyOptional({ description: 'Mot de passe de l\'utilisateur' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ description: 'Nom de l\'utilisateur' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ description: 'Prénom de l\'utilisateur' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Email de l\'utilisateur' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Numéro de téléphone de l\'utilisateur' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'Adresse de l\'utilisateur' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ description: 'Code postal de l\'utilisateur' })
  @IsString()
  @IsOptional()
  postalCode?: string;

  @ApiPropertyOptional({ description: 'Ville de l\'utilisateur' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ description: 'Pays de l\'utilisateur' })
  @IsString()
  @IsOptional()
  country?: string;
}
