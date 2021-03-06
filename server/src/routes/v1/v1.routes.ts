import { Router } from 'express';
import gamesRoutes from './games';
import authRoutes from './auth';
import userRoutes from './user';

const router = Router();

router.use('/games', gamesRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;
