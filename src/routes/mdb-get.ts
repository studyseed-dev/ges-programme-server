import { Router, Request, Response } from "express";
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from "jsonwebtoken";

import { BaselineLiteracyQuestions, BaselineNumeracyQuestions, User } from "../models";

import { fetchAdminQuestions } from "../utils/helperFunctions";
import { getQuestions, getQuestionsByModuleId } from "../utils/getQuestions";
import { Course } from "../types/Course";
import { Topic } from "../types/Topic";
import { getActiveModuleIds } from "../utils/getActiveModulesByCourse";

export const router = Router();
router.use(cookieParser());

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

router.get("/all-questions", async (req: Request, res: Response) => {
  const { topic, course } = req.query as {
    topic: Topic;
    course: Course;
  };

  try {
    let GAME_QUESTIONS = await getQuestions(course, topic);

    res.send(GAME_QUESTIONS);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error fetching ${topic} questions` });
  }
});

router.get("/questions-by-module", async (req: Request, res: Response) => {
  const { topic, course, moduleId } = req.query as {
    topic: Topic;
    course: Course;
    moduleId: string;
  };

  try {
    const questions = await getQuestionsByModuleId(course, topic, moduleId);
    /** example returned data
     * {
     *    _id: new ObjectId('696a3ca7611e04576a78b3a2'),
     *    modules: [ { module_id: 'E1_1', questions: [Array] } ]
     * }
     * */
    res.send(questions.modules[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error fetching ${topic} questions, ${error}` });
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

router.get("/admin-questions", async (req: Request, res: Response) => {
  try {
    let GAME_QUESTIONS = await fetchAdminQuestions();
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

router.get("/active-moduleIds", async (req: Request, res: Response) => {
  const { topic, course } = req.query as {
    week: string;
    topic: Topic;
    course: Course;
  };

  try {
    let activeModules = await getActiveModuleIds(course, topic);
    if (!activeModules) {
      res.status(404).json({ message: `Module IDs not found!` });
      return;
    }
    res.send(activeModules);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Internal error occured when fetching active modules IDs` });
  }
});

export default router;
