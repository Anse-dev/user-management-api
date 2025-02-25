import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/infrastructure/prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { login },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.user.delete({
      where: { id },
    });
    return true;
  }
}
