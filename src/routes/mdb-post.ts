import { Router, Request, Response } from "express";
import User, { Courses, initializeProgress } from "../models/User";
export const router = Router();

// Create a new user
router.post("/new-user", async (req: Request, res: Response) => {
  try {
    const pl = {
      ...req.body,
      progress: initializeProgress(req.body.courses),
    };
    const newUser = new User(pl);
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
