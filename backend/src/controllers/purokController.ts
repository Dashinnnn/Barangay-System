import { Request, Response } from 'express';
import { PurokService } from '../services/purokService';
import { createPurokSchema, updatePurokSchema } from '../validations/purokValidations';
import { validate } from '../middleware/validate';

export class PurokController {
    private purokService = new PurokService();

    create = [
        validate(createPurokSchema),
        async (req: Request, res: Response) => {
            try {
                const purok = await this.purokService.createPurok(req.body);
                res.status(201).json({
                    success: true,
                    data: purok
                });
            } catch (error: any) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
        }
    ];

    getAll = async (req: Request, res: Response) => {
        try {
            const puroks = await this.purokService.getAllPuroks();
            res.json({
                success: true,
                data: puroks
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (typeof id !== 'string' || !id) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid ID format'
                });
                return;
            }

            const purok = await this.purokService.getPurokById(id);
            res.json({
                success: true,
                data: purok
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    };

    update = [
        validate(updatePurokSchema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;

                if (typeof id !== 'string' || !id) {
                    res.status(400).json({
                        success: false,
                        message: 'Invalid ID format'
                    });
                    return;
                }

                const purok = await this.purokService.updatePurok(id, req.body);
                res.json({
                    success: true,
                    data: purok
                });
            } catch (error: any) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
        }
    ];

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (typeof id !== 'string' || !id) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid ID format'
                });
                return;
            }

            await this.purokService.deletePurok(id);
            res.json({
                success: true,
                message: 'Purok deleted successfully'
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };
}