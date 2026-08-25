import { QuestionsPayload } from "../models/QuestionModel";
import {
  getAdminQuestionsCollection,
  getRegistryQuestionCollection,
  resolveCourseTopic,
} from "./courseRegistry";

export const getQuestions = async (
  course: string,
  topic: string,
): Promise<QuestionsPayload> => {
  const resolved = await resolveCourseTopic(course, topic);

  if (resolved.isAdmin) {
    const doc = await getAdminQuestionsCollection().findOne().lean();
    return (doc ?? { modules: [] }) as unknown as QuestionsPayload;
  }

  const Collection = getRegistryQuestionCollection(resolved.course, resolved.topic);
  const doc = await Collection.findOne().lean();

  return (doc ?? { modules: [] }) as QuestionsPayload;
};

export const getQuestionsByModuleId = async (
  course: string,
  topic: string,
  moduleId: string,
): Promise<QuestionsPayload> => {
  const resolved = await resolveCourseTopic(course, topic);

  if (resolved.isAdmin) {
    const doc = await getAdminQuestionsCollection()
      .findOne({ "modules.module_id": moduleId }, { "modules.$": 1 })
      .lean();
    return (doc ?? { modules: [] }) as unknown as QuestionsPayload;
  }

  const Collection = getRegistryQuestionCollection(resolved.course, resolved.topic);

  return (await Collection.findOne(
    { "modules.module_id": moduleId },
    { "modules.$": 1 },
  ).lean()) as QuestionsPayload;
};
