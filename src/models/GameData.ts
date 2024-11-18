import mongoose from "mongoose";

export const weekSchema = {
  activeDate: String,
  allQuestions: {
    type: Map,
    of: [Object],
  },
};

export type QuestionSchema = {
  [key: string]: typeof weekSchema;
};

export const questionSchema = new mongoose.Schema({
  week1: weekSchema,
  week2: weekSchema,
  week3: weekSchema,
  week4: weekSchema,
  week5: weekSchema,
  week6: weekSchema,
  week7: weekSchema,
  week8: weekSchema,
  week9: weekSchema,
  week10: weekSchema,
  week11: weekSchema,
  week12: weekSchema,
});

export const NumeracyQuestions = mongoose.model(
  "NumeracyQuestions",
  questionSchema,
  "numeracy_questions"
);
export const LiteracyQuestions = mongoose.model(
  "LiteracyQuestions",
  questionSchema,
  "literacy_questions"
);
