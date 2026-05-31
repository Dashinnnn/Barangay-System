import { includes } from 'zod';
import { RequestStatus } from '@prisma/client';
import prisma from '../config/database';

export class DocumentRequestRepository {

    async create(data: any) {
        return prisma.documentRequest.create({
            data,
            include: {
                resident: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        purok: true
                    }
                }
            }
        });
    }

    async findById(id: string) {
        return prisma.documentRequest.findUnique({
            where: { id },
            include: {
                resident: {
                    include: { purok: true }
                }
            }
        });
    }

    async findAll(status?: string) {
        return prisma.documentRequest.findMany({
            where: status ? { status: status as RequestStatus } : {},
            include: {
                resident: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        purok: true
                    }
                }
            },
            orderBy: { requestedAt: 'desc' }
        });
    }

    async update(id: string, data: any) {
        return prisma.documentRequest.update({
            where: { id },
            data,
            include: {
                resident: true
            }
        });
    }

    async delete(id: string) {
        return prisma.documentRequest.delete({
            where: { id }
        });
    }
}