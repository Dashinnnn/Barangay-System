import prisma from '../config/database';

export class BlotterRepository {
    async create(data:any) {
        return prisma.blotterCase.create({
            data,
            include: {
                complaints: true,
                respondents: true,
                witnesses: true,
                filedBy: true,
                assignedTo: true
            }       
        });
    }

    async findAll(status?: string) {
        return prisma.blotterCase.findMany({
            where: status ? { status } : {},
            include: {
                complaints: true,
                respondents: true,
                filedBy: true,
                assignedTo: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findById(id: string) {
        return prisma.blotterCase.findUnique({
            where: { id },
            include: { 
                complaints: true,
                respondents: true,
                witnesses: true,
                hearings: true,
                settlements: true,
                filedBy: true,
                assignedTo: true
             }
        });
    }

    async update(id: string, data: any) {
        return prisma.blotterCase.update({
            where: { id },
            data,
            include:{
                complaints: true,
                respondents: true,
                filedBy: true
            }
        });
    }

    async delete(id: string) {
        return prisma.blotterCase.delete({ where: { id } })
    }
}