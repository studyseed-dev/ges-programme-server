import { Router, Request, Response } from "express";
import { User, initializeProgress } from "../models";
import { coursesArray } from "../models/User";
export const router = Router();
interface MongoError extends Error {
  code: number;
  keyPattern?: Record<string, any>;
  keyValue?: Record<string, any>;
}

/**
 * @openapi
 * /new-user:
 *   post:
 *     tags:
 *        - Create New User
 *     description: Create a new user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 userid:
 *                   type: string
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: string
 *                 enrolled_courses:
 *                   type: array
 *                   items:
 *                     type: string
 *              required:
 *                - userid
 *                - first_name
 *                - last_name
 *                - courses
 *                - enrolled_courses
 *     responses:
 *        201:
 *          description: New user created successfully
 *        400:
 *          description: Malformed syntax or invalid data
 *        409:
 *          description: User validation failed 
 */
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
    if((error as MongoError).code === 11000) {
      res.status(409).json({ 
        message: `${(error as MongoError).keyValue?.userid} already exist!`
      })
    }
    res.status(400).json({ message: `${(error as MongoError).message}` });
  }
});

export default router;
