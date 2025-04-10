// src/services/rating.service.ts
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

export class RatingService {
  static async submitOrUpdateRating(userId: string, storeId: string, value: number) {
    const ratingSchema = z.number().min(1).max(5);
    ratingSchema.parse(value);

    // Check if user already rated this store
    const existing = await prisma.rating.findFirst({
      where: { userId, storeId },
    });

    if (existing) {
      // Update rating
      return await prisma.rating.update({
        where: { id: existing.id },
        data: { value },
      });
    } else {
      // Submit new rating
      return await prisma.rating.create({
        data: { userId, storeId, value },
      });
    }
  }

  static async getUserRatingForStore(userId: string, storeId: string) {
    return await prisma.rating.findFirst({
      where: { userId, storeId },
    });
  }

  static async getRatingsForStore(storeId: string) {
    return await prisma.rating.findMany({
      where: { storeId },
      include: { user: true },
    });
  }
}
