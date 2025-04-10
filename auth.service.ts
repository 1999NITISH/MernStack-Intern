// src/services/auth.service.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { string, z } from 'zod';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();

export class AuthService {
  static async register(data: any) {
    const schema = z.object({
      name: z.string().min(20).max(60),
      email: z.string().email(),
      password: z
        .string()
        .min(8)
        .max(16)
        .regex(/[A-Z]/, 'Must contain an uppercase letter')
        .regex(/[^A-Za-z0-9]/, 'Must contain a special character'),
      address: z.string().max(400),
      role: z.enum(['USER', 'ADMIN', 'OWNER']).default('USER'),
    });

    const validated = schema.parse(data);

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });
    if (existingUser) throw new Error('Email already in use');

    const hashed = await hashPassword(validated.password);

    const user = await prisma.user.create({
      data: {
        ...validated,
        password: hashed,
      },
    });

    return user;
  }

  static async login(data: any) {
    const { email, password } = z
      .object({
        email: z.string().email(),
        password: z.string(),
      })
      .parse(data);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error('Invalid email or password');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    const token =await generateToken({ id: user.id }:string);

    return { token, user: { id: user.id, name: user.name, role: user.role } };
  }

  static async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error('User not found');

    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) throw new Error('Old password is incorrect');

    const hashed = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return true;
  }
}
