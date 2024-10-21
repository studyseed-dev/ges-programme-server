import { Router, Request, Response } from "express";
import {
  selectUser,
  selectUserAttempts,
  selectUserProgress,
  selectUserScores,
} from "../db/queries";
import { GAME_DATA } from "../services/gameData";
export const router = Router();

// Login route
router.get("/select-user", (req: Request, res: Response) => {
  const { userid } = req.query;

  if (typeof userid === "string") {
    const result = selectUser(userid);
    res.send(result);
  } else {
    res.status(400).send("Invalid userid");
  }
});

router.get("/user-progress", (req: Request, res: Response) => {
  const { userid } = req.query;

  if (typeof userid === "string") {
    const result = selectUserProgress(userid);
    res.send(result);
  } else {
    res.status(400).send("Invalid userid");
  }
});

router.get("/user-attempts", (req: Request, res: Response) => {
  const { userid } = req.query;

  if (typeof userid === "string") {
    const result = selectUserAttempts(userid);
    res.send(result);
  } else {
    res.status(400).send("Invalid userid");
  }
});

router.get("/user-scores", (req: Request, res: Response) => {
  const { userid } = req.query;

  if (typeof userid === "string") {
    const result = selectUserScores(userid);
    res.send(result);
  } else {
    res.status(400).send("Invalid userid");
  }
});

// Get game data including active dates, questions and answers
router.get("/game-data", (req: Request, res: Response) => {
  res.send(GAME_DATA);
});

export default router;
