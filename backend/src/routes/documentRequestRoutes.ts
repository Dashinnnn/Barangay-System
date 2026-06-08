import { Router } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import { DocumentRequestController } from '../controllers/documentRequestController';

const router = Router();
const docController = new DocumentRequestController();

//protected routes

router.post(
    '/', 
    authenticateJWT, 
    docController.create
);

router.get(
    '/',
    authenticateJWT,
    docController.getAll
);

router.get(
    '/:id',
    authenticateJWT,
    docController.getById
);

router.put(
    '/:id',
    authenticateJWT,
    docController.update
);


router.delete(
    "/:id",
    authenticateJWT,
    docController.delete
);

router.get(
    '/id/generate-pdf', 
    authenticateJWT,
    docController.generatePdf
);

export default router;