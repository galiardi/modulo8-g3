import { Router } from 'express';
import jewelsRouter from './jewels.router.js';
import imagesRouter from './images.router.js';

const router = Router();

router.use('/jewels', jewelsRouter);
router.use('/images', imagesRouter);

export default router;
