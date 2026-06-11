import { Request, Response } from 'express';
import { DocumentRequestService } from '../services/documentRequestService';
import { createDocumentRequestSchema, updateDocumentRequestSchema } from '../validations/documentRequestValidation';
import { validate } from '../middleware/validate';
import { success } from 'zod';
import { pdfService } from '../services/pdfService';


export class DocumentRequestController {
    private docService = new DocumentRequestService();

    create = [
        validate(createDocumentRequestSchema),
        async (req: Request, res: Response) => {
            try {
                const request = await this.docService.createRequest(req.body);
                res.status(201).json({
                    success: true,
                    data: request
                });
            } catch (error: any) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
        }
    ]

    getAll = async (req: Request, res: Response)  => {
        try {
            const requests = await this.docService.getAllRequests();
            res.json({
                success: true,
                data: requests
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    getById = async (req: Request, res: Response) => {
        try { 
            const { id } = req.params

            //Ensure id is a string
            if (typeof id !== 'string' || !id) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid ID format'
                });
                return;
            }
            const request = await this.docService.getRequestById(id);
            res.json ({
                success: true,
                data: request
            });
         } catch (error: any) {;
            res.status(404).json({
                success: false,
                message: error.message
            });
         }
    }

    update = [
        validate(updateDocumentRequestSchema),
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                //Ensure that id is a string
                if(typeof id !== 'string' || id) {
                    res.status(400).json ({
                        success: false,
                        message: 'Invalid ID format'
                    });
                    return;
                }
                const request = await this.docService.updateRequest(id, req.body);
                res.json({
                    success: true,
                    data: request
                });
            } catch (error: any) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
        }
    ]

    delete = async (req: Request, res: Response) => {
        try { 
            const { id } = req.params;
            //Ensure that data is a string

            if (typeof id !== 'string' || id ) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid ID format'
                });
                return;
            }
             await this.docService.deleteRequest(id);
             res.json({
                success: true,
                message: 'Document Request Deleted'
             })
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    generatePdf = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            //Ensure id is typeof string
            if (typeof id !== 'string' || id) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid ID Format'
                });
                return;
            }
            const request = await this.docService.getRequestById(id);

            if (request.status !== 'APPROVED') {
                res.status(400).json({
                    success: false,
                    message: 'Document must be approved before generating PDF'
                });
                return;
            }

            const pdfBytes = await pdfService.generateBarangayClearance({
                resident: request.resident,
                purpose: request.purpose,
                requestId: request.id,
                issuedBy: req.user?.email || 'Barangay Staff'
            });

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=Barangay-Clearance-${request.id}.pdf`);
            res.send(pdfBytes);
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
}