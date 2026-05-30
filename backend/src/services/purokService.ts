import { PurokRepository } from '../repository/purokRepository';

export class PurokService {
    private purokRepo = new PurokRepository();

    async createPurok(data: any) {
        return this.purokRepo.create(data);
    }

    async getAllPuroks() {
        return this.purokRepo.findAll();
    }

    async getPurokById(id: string) {
        const purok = await this.purokRepo.findById(id);
        if(!purok) throw new Error('Purok not found');
        return purok;
    }

    async updatePurok (id: string, data: any) {
        return this.purokRepo.update(id, data);
    }

    async deletePurok(id: string) {
        return this.purokRepo.delete(id);
    }
}