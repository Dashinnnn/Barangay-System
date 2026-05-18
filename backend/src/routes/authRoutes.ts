import { Router } from 'express';
import { Authcontroller } from '../controllers/authController';

const router = Router();
const authController = new Authcontroller();

//Public routes (no authentication needed)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;