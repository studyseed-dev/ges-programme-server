import mongoose from "mongoose";
import { Question } from "../types/question";

const questionSubSchema = new mongoose.Schema(
  {
    question_number: {
      type: String,
      required: true,
    },
  },
  {
    strict: false,
    _id: false,
  },
);

const moduleSchema = new mongoose.Schema<Module>(
  {
    module_id: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSubSchema],
      default: [],
    },
  },
  {
    _id: false,
  },
);

export const questionSchema = new mongoose.Schema(
  {
    modules: {
      type: [moduleSchema],
      default: [],
    },
  },
  { strict: true },
);

export type QuestionsPayload = {
  modules: Module[];
};

export type Module = {
  module_id: string;
  questions: Question[];
};
