import { Router, Request, Response } from "express";
import {
  QuestionSchema,
  NumeracyQuestions,
  LiteracyQuestions,
  GES2NumeracyQuestions,
  GES2LiteracyQuestions,
} from "../models";
import { CourseEnrolled, GameData } from "./types";
import { AdminQuestions } from "../models/AdminQuestions";

export const getQuestions = async (
  model: any,
  week: string,
  res: Response,
  errorMessage: string
) => {
  try {
    const data = await model.findOne({}, { [`${week}.allQuestions`]: 1 });
    res.status(200).json(data);
  } catch (err) {
    console.error(errorMessage, err);
    res.status(500).json({ error: errorMessage });
  }
};

export const fetchQuestions = async (
  courseEnrolled: CourseEnrolled,
  topic: string
): Promise<QuestionSchema | { [error: string]: string }> => {
  switch (courseEnrolled) {
    case "GES":
      switch (topic.toUpperCase()) {
        case "NUMERACY":
          return (await NumeracyQuestions.findOne().lean()) as unknown as QuestionSchema;
        case "LITERACY":
          return (await LiteracyQuestions.findOne().lean()) as unknown as QuestionSchema;
        default:
          return { error: `Invalid topic: ${topic}` };
      }

    case "GES2":
      switch (topic.toUpperCase()) {
        case "NUMERACY":
          return (await GES2NumeracyQuestions.findOne().lean()) as unknown as QuestionSchema;
        case "LITERACY":
          return (await GES2LiteracyQuestions.findOne().lean()) as unknown as QuestionSchema;
        default:
          return { error: `Invalid topic: ${topic}` };
      }

    default:
      return { error: `Invalid course enrolled: ${courseEnrolled}` };
  }
};

export const validateWeek = (questions: QuestionSchema, week: string): boolean => {
  return Object.hasOwn(questions, week);
};

export const extractor = (obj: QuestionSchema) => {
  const res = {} as { [key: string]: string };
  for (const key in obj) {
    if (obj[key].allQuestions) {
      const questionKey = Object.keys(obj[key].allQuestions);
      if (questionKey.length > 0) {
        res[key] = questionKey[0];
      }
    }
  }
  return res;
};

export const getActiveDates = async (courseEnrolled: CourseEnrolled) => {
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
  } catch (err) {
    console.error("Error fetching active dates:", err);
  }
};

export const fetchAdminQuestions = async (): Promise<
  QuestionSchema | { [error: string]: string }
> => {
  return (await AdminQuestions.findOne().select("-_id").lean()) as unknown as QuestionSchema;
};