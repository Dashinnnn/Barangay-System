import prisma from '../config/database';

export class ResidentRepository {
    async create(data: any) {
        return prisma.resident.create({
            data,
            include: { purok: true }
        });
    }

    async findAll(search?: string, purok?: string) {
        const where: any = {};

        if (search) {
            where.OR = [ 
                { firstName: { contains: search, mode: 'insensitive' } },
                { middleName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (purok) { 
            where.purok = { name: purok };
        }

        return prisma.resident.findMany({
            where,
            include: { purok: true },
            orderBy: { lastName: 'asc' }
        });
    }

    async findById(id: string) {
        return prisma.resident.findUnique({
            where: { id },
            include: { purok: true }
        });
    }

    async update(id: string, data: any) {
        return prisma.resident.update({
            where: { id },
            data,
            include: { purok: true }
        });
    }

    async delete(id: string) {
        return prisma.resident.delete({
            where: { id }
        });
    }
}