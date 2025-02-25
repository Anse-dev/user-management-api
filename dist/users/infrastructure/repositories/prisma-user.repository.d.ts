import { PrismaService } from '../../../core/infrastructure/prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
export declare class PrismaUserRepository implements UserRepositoryInterface {
    private prisma;
    constructor(prisma: PrismaService);
    create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByLogin(login: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, userData: Partial<User>): Promise<User>;
    delete(id: string): Promise<boolean>;
}
