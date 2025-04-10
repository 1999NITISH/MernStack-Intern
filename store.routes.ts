// src/routes/store.routes.ts
import { Router } from 'express';
import {
  getAllStores,
  createStore,
  getStoreRatings,
} from '../controllers/store.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllStores);
router.post('/', createStore);
router.get('/:storeId/ratings', getStoreRatings);

export default router;
