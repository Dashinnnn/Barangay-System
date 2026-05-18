import { Request, Response } from 'express';
import { AuthService } from "../services/authService";

export class Authcontroller {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService;
    }

    register = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.register(req.body);
            res.status(201).json({
                success: true,
                ...result
            }); 
        } catch (error: any){
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);

            res.json({
                success: true,
                ...result
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    logout = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.logout()
        } catch (error: any){
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}