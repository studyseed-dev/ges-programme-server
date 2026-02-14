import {
  QuestionsPayload,
  GLPNumeracyQuestions,
  GLPLiteracyQuestions,
  GES2LiteracyQuestions,
  GES2NumeracyQuestions,
  GESLiteracyQuestions,
  GESNumeracyQuestions,
} from "../models/QuestionModel";
import { Course } from "../types/course";
import { Topic } from "../types/topic";

export const getQuestions = async (course: Course, topic: Topic): Promise<QuestionsPayload> => {
  switch (course) {
    case Course.GES:
      switch (topic.toUpperCase()) {
        case "NUMERACY":
          return (await GESNumeracyQuestions.findOne().lean()) as unknown as QuestionsPayload;
        case "LITERACY":
          return (await GESLiteracyQuestions.findOne().lean()) as unknown as QuestionsPayload;
        default:
          throw new Error(`Invalid topic: ${topic}`);
      }

    case Course.GES2:
      switch (topic.toUpperCase()) {
        case "NUMERACY":
          return (await GES2NumeracyQuestions.findOne().lean()) as unknown as QuestionsPayload;
        case "LITERACY":
          return (await GES2LiteracyQuestions.findOne().lean()) as unknown as QuestionsPayload;
        default:
          throw new Error(`Invalid topic: ${topic}`);
      }

    case Course.GLP:
      switch (topic.toUpperCase()) {
        case "NUMERACY":
          return (await GLPNumeracyQuestions.findOne().lean()) as unknown as QuestionsPayload;
        case "LITERACY":
          return (await GLPLiteracyQuestions.findOne().lean()) as unknown as QuestionsPayload;
        default:
          throw new Error(`Invalid topic: ${topic}`);
      }

    default:
      throw new Error(`Invalid course: ${course}`);
  }
};

export const getQuestionsByModuleId = async (
  course: Course,
  topic: Topic,
  moduleId: string,
): Promise<QuestionsPayload> => {
  switch (course) {
    case Course.GES:
      switch (topic.toUpperCase()) {
        case "NUMERACY":
          return (await GESNumeracyQuestions.findOne(
            { "modules.module_id": moduleId },
            { "modules.$": 1 },
          ).lean()) as unknown as QuestionsPayload;
        case "LITERACY":
          return (await GESLiteracyQuestions.findOne(
            { "modules.module_id": moduleId },
            { "modules.$": 1 },
          ).lean()) as unknown as QuestionsPayload;
        default:
          throw new Error(`Invalid topic: ${topic}`);
      }

    case Course.GES2:
      switch (topic.toUpperCase()) {
        case "NUMERACY":
          return (await GES2NumeracyQuestions.findOne(
            { "modules.module_id": moduleId },
            { "modules.$": 1 },
          ).lean()) as unknown as QuestionsPayload;
        case "LITERACY":
          return (await GES2LiteracyQuestions.findOne(
            { "modules.module_id": moduleId },
            { "modules.$": 1 },
          ).lean()) as unknown as QuestionsPayload;
        default:
          throw new Error(`Invalid topic: ${topic}`);
      }

    case Course.GLP:
      switch (topic.toUpperCase()) {
        case "NUMERACY":
          return (await GLPNumeracyQuestions.findOne(
            { "modules.module_id": moduleId },
            { "modules.$": 1 },
          ).lean()) as unknown as QuestionsPayload;
        case "LITERACY":
          return (await GLPLiteracyQuestions.findOne(
            { "modules.module_id": moduleId },
            { "modules.$": 1 },
          ).lean()) as unknown as QuestionsPayload;
        default:
          throw new Error(`Invalid topic: ${topic}`);
      }

    default:
      throw new Error(`Invalid course: ${course}`);
  }
};
