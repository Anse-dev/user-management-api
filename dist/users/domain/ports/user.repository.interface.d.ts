import { User } from '../entities/user.entity';
export interface UserRepositoryInterface {
    create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByLogin(login: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, userData: Partial<User>): Promise<User>;
    delete(id: string): Promise<boolean>;
}
