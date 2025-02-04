import mongoose from "mongoose";

export const weekSchema = {
  activeDate: String,
  allQuestions: {
    type: Map,
    of: [Object],
  },
};

// used outside when questions are fetched from the database
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
});

export const GES2NumeracyQuestions = mongoose.model(
  "GES2NumeracyQuestions",
  questionSchema,
  "ges2_numeracy_questions"
);
export const GES2LiteracyQuestions = mongoose.model(
  "GES2LiteracyQuestions",
  questionSchema,
  "ges2_literacy_questions"
);
