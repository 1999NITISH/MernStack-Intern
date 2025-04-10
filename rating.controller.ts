// src/controllers/rating.controller.ts
import { Request, Response } from 'express';
import { RatingService } from '../services/rating.service';

export const submitRating = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    const storeId = Number(req.params.storeId);
    const { rating } = req.body;

    const result = await RatingService.submitOrUpdateRating(userId, storeId, rating);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getRatingsForStore = async (req: Request, res: Response) => {
  try {
    const storeId = Number(req.params.storeId);
    const ratings = await RatingService.getRatingsForStore(storeId);
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
