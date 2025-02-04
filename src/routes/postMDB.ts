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

// Update all user
// router.post("/enrolled-courses", async (req: Request, res: Response) => {});

// router.put("/update-user", async (req: Request, res: Response) => {});

// Route to update a single user by ID
router.put("/userup/:id", async (req: Request<any>, res: Response) => {
  try {
    const { id } = req.params; // Extract user ID from URL params.
    const updates = req.body; // Extract updates from the request body.
    // Update the user document with the provided ID
    const result = await User.updateOne({ userid: id }, { $set: updates });

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      modifiedCount: result,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user", error });
  }
});

export default router;
