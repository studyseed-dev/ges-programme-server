import mongoose from "mongoose";

export const baselineLevelSchema = {
  type: Array,
  of: Object,
};

export const questionSchema = new mongoose.Schema({
  el1: [Object],
  el2: [Object],
  el3: [Object],
  l1: [Object],
  l2: [Object],
});

export const BaselineNumeracyQuestions = mongoose.model(
  "BaselineNumeracyQuestions",
  questionSchema,
  "baseline_numeracy_questions"
);
export const BaselineLiteracyQuestions = mongoose.model(
  "BaselineLiteracyQuestions",
  questionSchema,
  "baseline_literacy_questions"
);
