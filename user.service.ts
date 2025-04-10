// src/services/user.service.ts
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  static async getAllUsers(filter?: {
    name?: string;
    email?: string;
    address?: string;
    role?: Role;
  }) {
    return await prisma.user.findMany({
      where: {
        name: filter?.name ? { contains: filter.name, mode: 'insensitive' } : undefined,
        email: filter?.email ? { contains: filter.email, mode: 'insensitive' } : undefined,
        address: filter?.address ? { contains: filter.address, mode: 'insensitive' } : undefined,
        role: filter?.role,
      },
      orderBy: { name: 'asc' },
    });
  }

  static async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  static async getUserWithRatings(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        ratings: {
          include: {
            store: true,
          },
        },
      },
    });
  }

  static async createUser(data: {
    name: string;
    email: string;
    password: string;
    address: string;
    role: Role;
  }) {
    return await prisma.user.create({
      data,
    });
  }

  static async updatePassword(id: string, hashedPassword: string) {
    return await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}
