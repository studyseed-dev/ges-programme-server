import { z } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Router, Request, Response } from "express";

import { User } from "../models";

dotenv.config();

const router = Router();

const loginSchema = z.object({
  userid: z.string().min(2, "UserID is required"),
});

const JWT_SECRET = process.env.JWT_SECRET as string;

router.post("/login", async (req: Request, res: Response) => {
  // Validate input
  const parseResult = loginSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      message: parseResult.error.issues[0]?.message || "Invalid input",
      operation: false,
    });
    return;
  }
  const parsedUserid = parseResult.data;

  try {
    const userLogin = await User.findOne({ userid: parsedUserid?.userid });
    if (!userLogin) {
      res.status(401).json({ message: "User does not exist!", operation: false });
      return;
    }
    if (!userLogin?.enrolled_courses || userLogin.enrolled_courses.length <= 0) {
      res.status(404).json({ message: "User not registered!", operation: false });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userid: userLogin?.userid }, JWT_SECRET, { expiresIn: "7d" });
    // Set token as HTTP-only cookie
    res
      .cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 24 * 60 * 60 * 1000,
        domain: process.env.NODE_ENV === "production" ? "ges-client.netlify.app" : undefined,
        path: "/",
      })
      .json({ message: "Login successful!", operation: true });
  } catch (error) {
    res.status(500).json({ message: `Login error - ${error}`, operation: false });
  }
});

export default router;
