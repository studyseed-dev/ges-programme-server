import {
  getAdminQuestionsCollection,
  getRegistryQuestionCollection,
  resolveCourseTopic,
} from "./courseRegistry";

export const getActiveModuleIds = async (course: string, topic: string): Promise<string[]> => {
  const resolved = await resolveCourseTopic(course, topic);

  if (resolved.isAdmin) {
    return (await getAdminQuestionsCollection().distinct(
      "modules.module_id",
    )) as unknown as string[];
  }

  const Collection = getRegistryQuestionCollection(resolved.course, resolved.topic);
  return Collection.distinct("modules.module_id");
};
