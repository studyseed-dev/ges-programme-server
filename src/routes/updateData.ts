import { Router, Request, Response } from "express";
import {
  selectUser,
  selectUserAttempts,
  updateAttemptCount,
  updateUserProgress,
} from "../db/queries";
const router = Router();

router.post("/select-user", (req: Request, res: Response) => {
  const { userid } = req.body;

  if (typeof userid === "string") {
    const result = selectUser(userid);
    res.send(result);
  } else {
    res.status(400).send("Invalid userid");
  }
});

router.post("/weekly-progress", (req: Request, res: Response) => {
  const { userid, week, date } = req.body;

  if (typeof userid === "string") {
    const result = updateUserProgress(userid, week, date);
    res.send(result);
  } else {
    res.status(400).send("Invalid userid or week or date");
  }
});

router.post("/attempt-count", (req: Request, res: Response) => {
  const { userid, week, newCount } = req.body;

  if (typeof userid === "string") {
    const result = updateAttemptCount(userid, week, newCount);
    res.send(result);
  } else {
    res.status(400).send("Invalid userid or week or date");
  }
});

export default router;
