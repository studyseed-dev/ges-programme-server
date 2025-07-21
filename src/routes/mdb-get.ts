import { Router, Request, Response } from "express";
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from "jsonwebtoken";

import {
  BaselineLiteracyQuestions,
  BaselineNumeracyQuestions,
  QuestionSchema,
  User,
} from "../models";
import { CourseEnrolled, extractor, fetchQuestions, getActiveDates, validateWeek } from "../utils";
import { fetchAdminQuestions } from "../utils/helperFunctions";

export const router = Router();
router.use(cookieParser());

router.get("/week-dates", async (req: Request, res: Response) => {
  const { courseEnrolled } = req.query;
  const activeDates = await getActiveDates(courseEnrolled as CourseEnrolled);
  res.status(200).json(activeDates);
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/find", async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.authToken;
    const secret = process.env.JWT_SECRET as string;

    if (!token) {
      res.status(401).json({ message: "Unauthorized: Missing token in cookies!" });
      return;
    }
    const { userid } = jwt.verify(token, secret) as JwtPayload & {
      userid: string;
    };
    const { userid: queryUserid } = req.query;

    if (userid !== queryUserid) {
      res.status(403).json({ message: "Forbidden: User ID mismatch" });
      return;
    }

    const user = await User.find({ userid }, { _id: 0 }).lean();
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.json(user[0]);
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

router.get("/weekly-questions", async (req: Request, res: Response) => {
  const { week, topic, courseEnrolled } = req.query as {
    week: string;
    topic: string;
    courseEnrolled: CourseEnrolled;
  };

  try {
    let GAME_QUESTIONS = (await fetchQuestions(courseEnrolled, topic)) as QuestionSchema;

    if (GAME_QUESTIONS.error) {
      res.status(400).json({ message: GAME_QUESTIONS.error });
      return;
    }

    if (!GAME_QUESTIONS || !validateWeek(GAME_QUESTIONS, week)) {
      res.status(404).json({ message: `${week} does not exist in this question set.` });
      return;
    }

    res.send(GAME_QUESTIONS[week].allQuestions);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error fetching ${topic} questions` });
  }
});

router.get("/module-map", async (req: Request, res: Response) => {
  const { week, topic, courseEnrolled } = req.query as {
    week: string;
    topic: string;
    courseEnrolled: CourseEnrolled;
  };

  try {
    let GAME_QUESTIONS = (await fetchQuestions(courseEnrolled, topic)) as QuestionSchema;

    if (GAME_QUESTIONS.error) {
      res.status(400).json({ message: GAME_QUESTIONS.error });
      return;
    }

    if (!GAME_QUESTIONS || !Object.hasOwn(GAME_QUESTIONS, week)) {
      res.status(404).json({ message: `Invalid week: ${week}` });
      return;
    } else {
      res.send({ [week]: Object.keys(GAME_QUESTIONS[week].allQuestions)[0] });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error fetching ${topic} map` });
  }
});

router.get("/baseline-questions", async (req: Request, res: Response) => {
  const { topic } = req.query as { topic: string };
  try {
    const GAME_QUESTIONS =
      topic.toUpperCase() === "NUMERACY"
        ? await BaselineNumeracyQuestions.findOne().lean()
        : await BaselineLiteracyQuestions.findOne().lean();
    delete (GAME_QUESTIONS as any)["_id"];
    const baselineQuestions = GAME_QUESTIONS;
    res.send(baselineQuestions);
  } catch (error) {
    console.error(error);
  }
});

router.get("/week-module-map", async (req: Request, res: Response) => {
  const { topic, courseEnrolled } = req.query as {
    week: string;
    topic: string;
    courseEnrolled: CourseEnrolled;
  };

  try {
    let GAME_QUESTIONS = (await fetchQuestions(courseEnrolled, topic)) as QuestionSchema;
    if (GAME_QUESTIONS.error) {
      res.status(400).json({ message: GAME_QUESTIONS.error });
      return;
    }

    if (!GAME_QUESTIONS) {
      res.status(404).json({ message: `Question not found!` });
    } else {
      res.send(extractor(GAME_QUESTIONS));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Internal error occured when fetching ${topic} map` });
  }
});

router.get("/admin-questions", async (req: Request, res: Response) => {
  try {
    let GAME_QUESTIONS = (await fetchAdminQuestions()) as QuestionSchema;
    if (!GAME_QUESTIONS) {
      res.status(404).json({ message: `Question not found!` });
      return;
    }
    res.send(GAME_QUESTIONS);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Internal error occured when fetching admin questions` });
  }
});

export default router;
