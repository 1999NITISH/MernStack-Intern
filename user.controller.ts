// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers(req.query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(Number(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserService.updatePassword(
      req.user?.id, // Assuming middleware adds `user` to req
      req.body.oldPassword,
      req.body.newPassword
    );
    res.json({ message: 'Password updated successfully', updatedUser });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
