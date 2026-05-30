import { Request, Response } from 'express';
import { AuthService } from "../services/authService";
import { registerSchema, loginSchema } from "../validations/authValidations";
import { validate } from "../middleware/validate";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = [
        validate(registerSchema),                   
        async (req: Request, res: Response) => {
            try {
                const result = await this.authService.register(req.body);
                res.status(201).json({
                    success: true,
                    ...result
                });
            } catch (error: any) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
        }
    ];

    login = [
        validate(loginSchema),                       
        async (req: Request, res: Response) => {
            try {
                const { email, password } = req.body;
                const result = await this.authService.login(email, password);

                res.json({
                    success: true,
                    ...result
                });
            } catch (error: any) {
                res.status(401).json({               
                    success: false,
                    message: error.message
                });
            }
        }
    ];

    logout = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.logout();
            res.json({
                success: true,
                ...result
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
}