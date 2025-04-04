import mongoose from "mongoose";

export const weekSchema = {
  type: Array,
  of: [Object],
};

export type QuestionSchema = {
  [key: string]: typeof weekSchema;
};

export const questionSchema = new mongoose.Schema({
  ADMIN: weekSchema,
});

export const AdminQuestions = mongoose.model("AdminQuestions", questionSchema, "admin_questions");
