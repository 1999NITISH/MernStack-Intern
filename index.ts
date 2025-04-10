// src/routes/index.ts
 import { Router } from 'express';
 import authRoutes from './auth.routs';
 import userRoutes from './user.routes';
import storeRoutes from './store.routes';
import ratingRoutes from './rating.routes';


const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/stores', storeRoutes);
router.use('/ratings', ratingRoutes);

export default router;
