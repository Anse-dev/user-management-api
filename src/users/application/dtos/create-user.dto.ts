import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Login unique de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: 'Mot de passe de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Nom de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({ description: 'Prénom de l\'utilisateur' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ description: 'Numéro de téléphone de l\'utilisateur' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'Adresse de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Code postal de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ description: 'Ville de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'Pays de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  country: string;
}
