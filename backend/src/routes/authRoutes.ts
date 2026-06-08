import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';
import { loginSchema, registerSchema } from '../validations/authValidations';
import { validate } from '../middleware/validate';
const router = Router();
const authController = new AuthController();

//Public routes (no authentication needed)
router.post(
    '/register',
    validate(registerSchema), 
    authController.register
);

router.post(
    '/login',
    validate(loginSchema), 
    authController.login);

//Protected routes (need to login)
router.post('/logout', authenticateJWT, authController.logout);

export default router;