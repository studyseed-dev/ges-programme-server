import { Router, Request, Response } from "express";
import User from "../models/User";
export const router = Router();

// Create a new user
router.post("/new-user", async (req: Request, res: Response) => {
  try {
    const users = new User(req.body);
    await users.save();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
