import { Router, Request, Response } from "express";
import {
  selectUser,
  selectUserAttempts,
  selectUserProgress,
  selectUserScores,
} from "../db/queries";
import { GAME_DATA_NUM, GAME_DATA_LIT } from "../services/gameData";
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
    console.log("result", result);
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
  const GAME_DATA = { num: GAME_DATA_NUM, lit: GAME_DATA_LIT };
  res.send(GAME_DATA);
});

router.get("/weekly-questions", (req: Request, res: Response) => {
  const { week } = req.query;

  if (typeof week === "string") {
    const weeklyQuestions = GAME_DATA_NUM[week].allQuestions;
    res.send(weeklyQuestions);
  } else throw new Error("Invalid week");
});

export default router;
