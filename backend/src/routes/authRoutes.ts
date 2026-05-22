import { Router } from 'express';
import { Authcontroller } from '../controllers/authController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();
const authController = new Authcontroller();

//Public routes (no authentication needed)
router.post('/register', authController.register);
router.post('/login', authController.login);

//Protected routes (need to login)
router.post('/logout', authenticateJWT, authController.logout);

export default router;