import {
  GESNumeracyQuestions,
  GESLiteracyQuestions,
  GLPNumeracyQuestions,
  GLPLiteracyQuestions,
  GES2NumeracyQuestions,
  GES2LiteracyQuestions,
} from "../models/QuestionModel";
import { Course } from "../types/course";
import { Topic } from "../types/topic";

export const getActiveModuleIds = async (course: Course, topic: Topic): Promise<string[]> => {
  switch (course) {
    case Course.GES:
      switch (topic.toUpperCase()) {
        case Topic.NUMERACY:
          return (await GESNumeracyQuestions.distinct("modules.module_id")) as unknown as string[];
        case Topic.LITERACY:
          return (await GESLiteracyQuestions.distinct("modules.module_id")) as unknown as string[];
        default:
          throw new Error(`Invalid topic: ${topic}`);
      }

    case Course.GES2:
      switch (topic.toUpperCase()) {
        case Topic.NUMERACY:
          return (await GES2NumeracyQuestions.distinct("modules.module_id")) as unknown as string[];
        case Topic.LITERACY:
          return (await GES2LiteracyQuestions.distinct("modules.module_id")) as unknown as string[];
        default:
          throw new Error(`Invalid topic: ${topic}`);
      }

    case Course.GLP:
      switch (topic.toUpperCase()) {
        case Topic.NUMERACY:
          return (await GLPNumeracyQuestions.distinct("modules.module_id")) as unknown as string[];
        case Topic.LITERACY:
          return (await GLPLiteracyQuestions.distinct("modules.module_id")) as unknown as string[];
        default:
          throw new Error(`Invalid topic: ${topic}`);
      }

    default:
      throw new Error(`Invalid course: ${course}`);
  }
};
