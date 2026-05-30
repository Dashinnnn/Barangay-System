import { stat } from "node:fs";
import { DocumentRequestRepository } from "../repository/documentRequestRepository";

export class DocumentRequestService {
    private docRepo = new DocumentRequestRepository();

    async createRequest(data: any) {
        return this.docRepo.create(data);
    }

    async getAllRequests(status?: string) {
        return this.docRepo.findAll(status);
    }

    async getRequestById(id: string) {
        const request = await this.docRepo.findById(id);
        if (!request) throw new Error ('Document request not found');
        return request;
    }

    async updateRequest(id: string, data: any) {
        return this.docRepo.update(id, data);
    }

    async deleteRequest(id: string) {
        return this.docRepo.delete(id);
    }
}