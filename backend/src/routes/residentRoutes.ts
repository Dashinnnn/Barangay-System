import { Router } from 'express';
import { ResidentController } from '../controllers/residentController';
import { authenticateJWT } from '../middleware/authMiddleware';


const router = Router();
const residentController = new ResidentController();

//All resident routes are protected (requires login)
router.post('/', authenticateJWT, residentController.create);
router.post('/', authenticateJWT, residentController.getAll);
router.post('/:id', authenticateJWT, residentController.getById);
router.post('/:id', authenticateJWT, residentController.update);
router.post('/:id', authenticateJWT, residentController.delete);

export default router;