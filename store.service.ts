// src/services/store.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class StoreService {
  static async createStore(data: {
    name: string;
    email: string;
    address: string;
    ownerId: string;
  }) {
    return await prisma.store.create({
      data,
    });
  }

  static async getAllStores(filter?: { name?: string; address?: string }) {
    return await prisma.store.findMany({
      where: {
        name: filter?.name ? { contains: filter.name, mode: 'insensitive' } : undefined,
        address: filter?.address ? { contains: filter.address, mode: 'insensitive' } : undefined,
      },
      include: {
        ratings: true,
      },
    });
  }

  static async getStoreById(id: string) {
    return await prisma.store.findUnique({
      where: { id },
      include: {
        ratings: true,
      },
    });
  }

  static async getStoresByOwnerId(ownerId: string) {
    return await prisma.store.findMany({
      where: { ownerId },
      include: {
        ratings: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  static async calculateAverageRating(storeId: string) {
    const ratings = await prisma.rating.findMany({
      where: { storeId },
      select: { value: true },
    });

    if (!ratings.length) return 0;
    const sum = ratings.reduce((acc, curr) => acc + curr.value, 0);
    return sum / ratings.length;
  }
}
