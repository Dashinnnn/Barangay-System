import prisma from '../config/database';
import { Resident } from '@prisma/client'

export class ResidentRepository {

    async create (data: Omit<Resident, 'id' | 'createdAt' | 'updatedAt'>) {
        return prisma.resident.create({ data })
    }

    async findAll(search?: string, purok?: string) {
        return prisma.resident.findMany({
            where: {
                AND: [
                    search ? {
                        OR: [
                            { firstName: { contains: search, mode: 'insensitive' } },
                            { lastName: { contains: search, mode: 'insensitive' } },
                            { middleName: { contains: search, mode: 'insensitive' } },
                        ]
                    } : {},
                    purok ? { purok } : {}
                ]
            },
            orderBy: { lastName: 'asc' }
        });
    }

    async findById(id: string) {
        return prisma.resident.findUnique({
            where: { id }
        });
    }

    async update(id: string, data: Partial<Resident>) {
        return prisma.resident.update({
            where: { id },
            data
        });
    }

    async delete(id: string) {
        return prisma.resident.delete({
            where: { id }
        });
    }

}