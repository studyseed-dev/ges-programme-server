import { Router, Request, Response } from "express";
import { User, initializeProgress } from "../models";

export const router = Router();
interface MongoError extends Error {
  code: number;
  keyPattern?: Record<string, any>;
  keyValue?: Record<string, any>;
}

router.post("/new-user", async (req: Request, res: Response) => {
  try {
    const requestBody = {
      ...req.body,
      progress: initializeProgress(req.body.courses),
    };
    const newUser = new User(requestBody);
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    if ((error as MongoError).code === 11000) {
      res.status(409).json({
        message: `${(error as MongoError).keyValue?.userid} already exist!`,
      });
      return;
    }
    res.status(400).json({ message: `${(error as MongoError).message}` });
  }
});

export default router;
