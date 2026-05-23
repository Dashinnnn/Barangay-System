import { ResidentRepository } from "../repository/residentRepository";


export class ResidentService {
    private residentRepo: ResidentRepository

    constructor() {
        this.residentRepo = new ResidentRepository();
    }

    async createResident(data: any) {
        //Add business logic later (validation, checks or kahit ano)
        return this.residentRepo.create(data);
    }

    async getAllResidents(search?: string, purok?: string) {
        return this.residentRepo.findAll(search, purok);
    }

    async getResidentById(id: string) {
        const resident = await this.residentRepo.findById(id);
        if (!resident) throw new Error('Resident not found');
        return resident;
    }

    async updateResident(id: string, data: any) {
        return this.residentRepo.update(id, data);
    }

    async deleteResident(id: string) {
        return this.residentRepo.delete(id);
    }
}