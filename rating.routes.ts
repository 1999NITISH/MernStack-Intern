// src/routes/rating.routes.ts
import { Router } from 'express';
import {
  submitRating,
  updateRating,
} from '../controllers/rating.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', submitRating);
router.put('/:ratingId', updateRating);

export default router;
