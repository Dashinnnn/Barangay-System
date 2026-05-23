import { ResidentService } from "../services/residentService";
import { Request, Response } from "express";

export class ResidentController {
    private residentService: ResidentService;

    constructor() {
        this.residentService = new ResidentService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const resident = await this.residentService.createResident(req.body);
            res.status(201).json({
                success: true,
                data: resident
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const { search, purok } = req.query;
            const residents = await this.residentService.getAllResidents(
                search as string,
                purok as string
            );
            res.json({ success: true, data: residents });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            //Ensure id is a string
            if (typeof id !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Invalid ID format'
                });
                return;
            }
            const resident = await this.residentService.getResidentById(id);
            res.json({ 
                success: true,
                data: resident 
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            //Ensure id is a string
            if (typeof id !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Invalid ID format'
                });
                return;
            }
            const resident = await this.residentService.updateResident(id, req.body);
            res.json({
                success: true,
                data: resident
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            //Ensure id is a string
            if (typeof id !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Invalid ID format'
                });
                return;
            }

            const resident = await this.residentService.deleteResident(id);
            res.json({ 
                succes: true,
                message: 'Resident deleted successfully!'
             });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };
}