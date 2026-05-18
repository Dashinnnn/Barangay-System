import { PrismaClient, User, Role } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthRepository {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    async createUser(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role?: Role;
    }): Promise<User> {
        return prisma.user.create({
            data,
        });
    }

    async updateLastLogin(userId: string): Promise<void> {
        await prisma.user.update({
            where: { id: userId },
            data: { updatedAt: new Date() },
        })
    }
}