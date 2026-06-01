import { Response, Request } from 'express';
import { BlotterService } from "../services/blotterService";
import { createBlotterCaseSchema, updateBlotterCaseSchema } from '../validations/blotterValidations';
import { validate } from '../middleware/validate';
import { success } from 'zod';

export class BlotterController {
    private blotterService = new BlotterService();

    create = [
        validate(createBlotterCaseSchema),
        async (req: Request, res: Response) => {
            try {
                const blotterCase = await this.blotterService.createBlotterCase(req.body);
                res.status(201).json({
                    success: true,
                    data: blotterCase
                });
            } catch (error: any) {
                res.status(400).json({
                    success:false,
                    message: error.message
                });
            }
        }
    ];

    getAll = async(req: Request, res: Response) => {
        try {
            const { status } = req.query;
            const cases = await this.blotterService.getAllBlotterCase(status as string);
            res.json({
                success: true,
                data: cases,
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
            //Ensure the typeof id is string || id
            if (typeof id !== 'string' || id) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid ID format'
                });
                return;
            }
            const blotterCase = await this.blotterService.getBlotterCaseById(id);
            res.json({
                success: true,
                data: blotterCase
            })
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message
            })
        }
    }

    update = [
        validate(updateBlotterCaseSchema),
        async (res: Response, req: Request) => {
            try {
                const { id } = req.params;
                //Ensure typeof id is string || id
                if(typeof id !== 'string' || id) {
                    res.status(400).json({
                        success: false,
                        message: 'Invalid ID format'
                    })
                    return;
                }
                const blotterCase = await this.blotterService.update(id, req.body)
                res.json({
                    success: true,
                    data: blotterCase
                })
            } catch (error: any){
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
            //Ensure typeof id is string || id
            if(typeof id !== 'string' || id) {
                res.status(400).json({
                    success:false,
                    message: 'Invalid ID format'
                });
                return;
            }
            await this.blotterService.delete(id)
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}