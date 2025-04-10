// src/controllers/store.controller.ts
import { Request, Response } from 'express';
import { StoreService } from '../services/store.service';

export const getAllStores = async (req: Request, res: Response) => {
  try {
    const stores = await StoreService.getAllStores(req.query);
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getStoreById = async (req: Request, res: Response) => {
  try {
    const store = await StoreService.getStoreById(Number(req.params.id));
    res.json(store);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const createStore = async (req: Request, res: Response) => {
  try {
    const store = await StoreService.createStore(req.body);
    res.status(201).json(store);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getStoreRatings = async (req: Request, res: Response) => {
  try {
    const data = await StoreService.getStoreRatings(Number(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error
