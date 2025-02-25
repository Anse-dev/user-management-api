import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  lastName: string;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
