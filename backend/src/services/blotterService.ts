import { BlotterRepository } from "../repository/blotterRepository";

export class BlotterService {
    private blotterRepo = new BlotterRepository();

    async createBlotterCase(data: any) {
        return this.blotterRepo.create(data);
    }

    async getAllBlotterCase(status?: string) {
        return this.blotterRepo.findAll(status)
    }

    async getBlotterCaseById(id: string) {
        const caseData = this.blotterRepo.findById(id);
        if(!caseData) throw new Error ('Blotter Case not found')
        return caseData;
    }

    async update(id: string, data: any) {
        return this.blotterRepo.update(id, data)
    }

    async delete(id: string) {
        return this.blotterRepo.delete(id)
    }
}