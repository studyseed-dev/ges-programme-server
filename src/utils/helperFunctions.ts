import { QuestionSchema } from "../models";
import { AdminQuestions } from "../models/AdminQuestions";

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

export const fetchAdminQuestions = async (): Promise<
  QuestionSchema | { [error: string]: string }
> => {
  return (await AdminQuestions.findOne().select("-_id").lean()) as unknown as QuestionSchema;
};
