import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import { BlotterController } from "../controllers/blotterController";

const router = Router();
const blotterController = new BlotterController();

router.post(
    '/',
    authenticateJWT,
    blotterController.create
);

router.get(
    '/',
    authenticateJWT,
    blotterController.getAll
);

router.get(
    '/:id',
    authenticateJWT,
    blotterController.getById
);

router.put(
    '/:id',
    authenticateJWT,
    blotterController.update
);

router.delete(
    '/:id',
    authenticateJWT,
    blotterController.delete
)

export default router;