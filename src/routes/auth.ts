import { Router, Request, Response } from "express";
import { checkUserExists } from "../db/queries";
const router = Router();

// Login route
router.post("/login", (req: Request, res: Response) => {
  const { userid } = req.body;
  // Login logic here
  const result = checkUserExists(userid);
  res.send(result);
});

// Logout route
router.post("/logout", (req: Request, res: Response) => {
  // Logout logic here
  res.send("Logout endpointsss");
});

export default router;
