import { Router, Request, Response } from "express";
import { LiteracyQuestions, NumeracyQuestions, QuestionSchema } from "../models/GameData";
import User from "../models/User";
export const router = Router();

const getQuestions = async (model: any, week: string, res: Response, errorMessage: string) => {
  try {
    const data = await model.findOne({}, { [`${week}.allQuestions`]: 1 });
    res.status(200).json(data);
  } catch (err) {
    console.error(errorMessage, err);
    res.status(500).json({ error: errorMessage });
  }
};

router.get("/lit-questions", (req: Request, res: Response) => {
  const { week } = req.query;
  getQuestions(LiteracyQuestions, week as string, res, "Error fetching Literacy questions:");
});

router.get("/num-questions", (req: Request, res: Response) => {
  const { week } = req.query;
  getQuestions(NumeracyQuestions, week as string, res, "Error fetching Numeracy questions:");
});

// Get all users
router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// find all users by age
router.get("/find", async (req: Request, res: Response) => {
  const { userid } = req.query;
  try {
    const users = await User.find({ userid }, {});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

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

// update user progress if pass in one go
router.put("/update-progress", async (req: Request, res: Response) => {
  const { userid, week, course, scoreArr } = req.body;
  try {
    const user = await User.findOne({ userid });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedProgress = user.progress[course][week].map(() => new Date());

    // instead of pushing the new score, we replace the score at the given week
    const update = {
      $set: {
        [`progress.${course}.${week}`]: updatedProgress,
        [`scores.${course}.${week}`]: scoreArr,
      },
    };

    const updatedUser = await User.findOneAndUpdate({ userid }, update, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ error });
  }
});

router.put("/incre-attempts", async (req: Request, res: Response) => {
  const { userid, week, course } = req.body;
  try {
    const user = await User.findOne({ userid });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const currentAttempts = user.attempts[course][week];
    console.log("currentAttempts", currentAttempts);
    const update = {
      $set: {
        [`attempts.${course}.${week}`]: currentAttempts + 1,
      },
    };

    const updatedUser = await User.findOneAndUpdate({ userid }, update, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating attempts:", error);
    res.status(500).json({ error });
  }
});

router.get("/weekly-questions", async (req: Request, res: Response) => {
  const { week, topic } = req.query as { week: string; topic: string };
  try {
    const GAME_QUESTION =
      topic.toUpperCase() === "NUMERACY"
        ? ((await NumeracyQuestions.findOne()) as QuestionSchema)
        : ((await LiteracyQuestions.findOne()) as QuestionSchema);
    const weeklyQuestions = GAME_QUESTION[week].allQuestions;

    res.send(weeklyQuestions);
  } catch (error) {
    console.error(error);
  }

  if (typeof week === "string") {
  } else throw new Error("Invalid week");
});

router.get("/user-progress", async (req: Request, res: Response) => {
  const { userid, week, topic } = req.query as { userid: string; week: string; topic: string };
  try {
    const user = await User.findOne({ userid });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user.progress[topic][week]);
  } catch (error) {
    console.error(error);
  }
});

export default router;
