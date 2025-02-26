import { Router, Request, Response } from "express";
import { LiteracyQuestions, NumeracyQuestions, QuestionSchema } from "../models/GameData";
import User from "../models/User";
import { BaselineLiteracyQuestions, BaselineNumeracyQuestions } from "../models/BaselineGameData";
import { GES2LiteracyQuestions, GES2NumeracyQuestions } from "../models/GES2GameData";

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

type GameData = {
  [key: string]:
    | {
        [key: string]: string;
      }
    | string
    | {};
};

type CourseEnrolled = "GES" | "GES2";

const getActiveDates = async (courseEnrolled: CourseEnrolled) => {
  try {
    let dateObj = {
      litDates: {},
      numDates: {},
    };
    switch (courseEnrolled) {
      case "GES":
        const lit = await LiteracyQuestions.findOne(
          {},
          {
            "week1.activeDate": 1,
            "week2.activeDate": 1,
            "week3.activeDate": 1,
            "week4.activeDate": 1,
            "week5.activeDate": 1,
            "week6.activeDate": 1,
            "week7.activeDate": 1,
            "week8.activeDate": 1,
            "week9.activeDate": 1,
            "week10.activeDate": 1,
            "week11.activeDate": 1,
            "week12.activeDate": 1,
          }
        ).lean();
        delete (lit as unknown as GameData)["_id"];

        const num = await NumeracyQuestions.findOne(
          {},
          {
            "week1.activeDate": 1,
            "week2.activeDate": 1,
            "week3.activeDate": 1,
            "week4.activeDate": 1,
            "week5.activeDate": 1,
            "week6.activeDate": 1,
            "week7.activeDate": 1,
            "week8.activeDate": 1,
            "week9.activeDate": 1,
            "week10.activeDate": 1,
            "week11.activeDate": 1,
            "week12.activeDate": 1,
          }
        ).lean();
        delete (num as unknown as GameData)["_id"];

        if (lit && num) {
          dateObj.litDates = lit as GameData;
          dateObj.numDates = num as GameData;
        }
        return dateObj;

      case "GES2":
        const lit2 = await GES2LiteracyQuestions.findOne(
          {},
          {
            "week1.activeDate": 1,
            "week2.activeDate": 1,
            "week3.activeDate": 1,
            "week4.activeDate": 1,
            "week5.activeDate": 1,
            "week6.activeDate": 1,
            "week7.activeDate": 1,
            "week8.activeDate": 1,
            "week9.activeDate": 1,
            "week10.activeDate": 1,
          }
        ).lean();
        lit2 && delete (lit2 as unknown as GameData)["_id"];

        const num2 = await GES2NumeracyQuestions.findOne(
          {},
          {
            "week1.activeDate": 1,
            "week2.activeDate": 1,
            "week3.activeDate": 1,
            "week4.activeDate": 1,
            "week5.activeDate": 1,
            "week6.activeDate": 1,
            "week7.activeDate": 1,
            "week8.activeDate": 1,
            "week9.activeDate": 1,
            "week10.activeDate": 1,
          }
        ).lean();

        num2 && delete (num2 as unknown as GameData)["_id"];

        dateObj.litDates = (lit2 as GameData) || {};
        dateObj.numDates = (num2 as GameData) || {};

        return dateObj;

      default:
        throw new Error("Invalid course enrolled");
    }
    // const litDates = await LiteracyQuestions.findOne(
    //   {},
    //   {
    //     "week1.activeDate": 1,
    //     "week2.activeDate": 1,
    //     "week3.activeDate": 1,
    //     "week4.activeDate": 1,
    //     "week5.activeDate": 1,
    //     "week6.activeDate": 1,
    //     "week7.activeDate": 1,
    //     "week8.activeDate": 1,
    //     "week9.activeDate": 1,
    //     "week10.activeDate": 1,
    //     "week11.activeDate": 1,
    //     "week12.activeDate": 1,
    //   }
    // ).lean();
    // delete (litDates as unknown as GameData)["_id"];

    // const numDates = await NumeracyQuestions.findOne(
    //   {},
    //   {
    //     "week1.activeDate": 1,
    //     "week2.activeDate": 1,
    //     "week3.activeDate": 1,
    //     "week4.activeDate": 1,
    //     "week5.activeDate": 1,
    //     "week6.activeDate": 1,
    //     "week7.activeDate": 1,
    //     "week8.activeDate": 1,
    //     "week9.activeDate": 1,
    //     "week10.activeDate": 1,
    //     "week11.activeDate": 1,
    //     "week12.activeDate": 1,
    //   }
    // ).lean();
    // delete (numDates as unknown as GameData)["_id"];
  } catch (err) {
    console.error("Error fetching active dates:", err);
  }
};

router.get("/week-dates", async (req: Request, res: Response) => {
  const { courseEnrolled } = req.query;
  const activeDates = await getActiveDates(courseEnrolled as CourseEnrolled);
  res.status(200).json(activeDates);
});

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

// find all users by
router.get("/find", async (req: Request, res: Response) => {
  const { userid } = req.query;
  try {
    const users = await User.find({ userid }, {});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/weekly-questions", async (req: Request, res: Response) => {
  const { week, topic, courseEnrolled } = req.query as {
    week: string;
    topic: string;
    courseEnrolled: CourseEnrolled;
  };

  try {
    let weeklyQuestions = {};

    if (courseEnrolled === "GES") {
      const GAME_QUESTIONS =
        topic.toUpperCase() === "NUMERACY"
          ? ((await NumeracyQuestions.findOne()) as QuestionSchema)
          : ((await LiteracyQuestions.findOne()) as QuestionSchema);
      if (!GAME_QUESTIONS)
        res.status(404).send({ error: `${topic} questions for this is not available.` });
      weeklyQuestions = GAME_QUESTIONS[week].allQuestions;
    } else if (courseEnrolled === "GES2") {
      const GAME_QUESTIONS =
        topic.toUpperCase() === "NUMERACY"
          ? ((await GES2NumeracyQuestions.findOne()) as QuestionSchema)
          : ((await GES2LiteracyQuestions.findOne()) as QuestionSchema);
      if (!GAME_QUESTIONS) throw new Error("Error fetching Numeracy questions:");

      weeklyQuestions = GAME_QUESTIONS[week].allQuestions;
    }

    res.send(weeklyQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error fetching ${topic} questions` });
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

// router.get("/user-progress", async (req: Request, res: Response) => {
//   const { userid, week, topic } = req.query as { userid: string; week: string; topic: string };
//   try {
//     const user = await User.findOne({ userid });
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }
//     res.status(200).json(user.progress[topic][week]);
//   } catch (error) {
//     console.error(error);
//   }
// });

export default router;
