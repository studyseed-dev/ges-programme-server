import { Router, Request, Response } from "express";
import { selectUser, selectUserProgress } from "../db/queries";
const router = Router();
import { GAME_DATA } from "../services/gameData";

// Login route
router.get("/select-user", (req: Request, res: Response) => {
  const { userid } = req.body;
  const result = selectUser(userid);
  res.send(result);
});

router.get("/user-progress", (req: Request, res: Response) => {
  const { userid } = req.body;
  const result = selectUserProgress(userid);
  res.send(result);
});

// Get game data including active dates, questions and answers
router.get("/game-data", (req: Request, res: Response) => {
  res.send(GAME_DATA);
});

export default router;
