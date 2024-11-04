import { Router, Request, Response } from "express";
import {
  incrementStars,
  updateAttemptCount,
  updateUserProgressAndScore,
  WeekString,
} from "../db/queries";
const router = Router();

router.post("/weekly-progress", (req: Request, res: Response) => {
  const { userid, week, date, scores, course } = req.body;

  if (typeof userid === "string") {
    const result = updateUserProgressAndScore(userid, week, date, scores, course);
    res.send(result);
  } else {
    res.status(400).send("Invalid userid or week or date");
  }
});

router.post("/user-stars", (req: Request, res: Response) => {
  const { userid, amount, course } = req.body as { userid: string; amount: number; course: string };
  try {
    const result = incrementStars(userid, amount, course);
    res.send(result);
  } catch (error) {
    res.status(400).send({ error: error, message: "Error updating stars" });
  }
});

router.post("/attempt-count", (req: Request, res: Response) => {
  const { userid, week, course } = req.body as { userid: string; week: WeekString; course: string };
  try {
    const result = updateAttemptCount(userid, week, course);
    res.send(result);
  } catch (error) {
    res.status(400).send({ error: error, message: "Error updating attempt count" });
  }
});

export default router;
