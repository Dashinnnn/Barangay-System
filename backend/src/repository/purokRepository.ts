import prisma from "../config/database";

export class PurokRepository {
    async create(data: any) {
        return prisma.purok.create({ data });
    }

    async findAll() {
        return prisma.purok.findMany({
            include: { _count: { select: { residents: true } } },
            orderBy: { name: 'asc' }
        });
    }

    async findById(id: string) {
        return prisma.purok.findUnique({
            where: { id },
            include: { residents: true }
        });
    }

    async update (id: string, data: any) {
        return prisma.purok.update({ 
            where: { id },
            data
         });
    }

    async delete (id: string) {
        //Check if purok still has resident
        const purok = await prisma.purok.findUnique({
            where: { id },
            include: { _count: { select: { residents: true } } }
        });

        if (purok && purok._count.residents > 0) {
            throw new Error('Cannot delete purok that still has residents');
        }

        return prisma.purok.delete({
            where: { id }
        });
    }
}