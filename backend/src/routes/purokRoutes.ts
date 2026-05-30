import { Router } from 'express';
import { PurokController } from '../controllers/purokController';
import { authenticateJWT } from '../middleware/authMiddleware';
const router = Router();
const purokController = new PurokController();

//Protected routes

router.post(
    '/', 
    authenticateJWT, 
    purokController.create
);

router.get(
    '/',
    authenticateJWT,
    purokController.getAll
)

router.get(
    '/:id',
    authenticateJWT,
    purokController.getById
)

router.put(
    '/:id',
    authenticateJWT,
    purokController.update
)

router.delete(
    '/:id',
    authenticateJWT,
    purokController.delete
)

export default router;




