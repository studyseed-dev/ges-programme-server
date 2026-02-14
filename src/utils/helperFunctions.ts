import { AdminQuestions, QuestionSchema } from "../models/AdminQuestions";

export const fetchAdminQuestions = async (): Promise<
  QuestionSchema | { [error: string]: string }
> => {
  return (await AdminQuestions.findOne().select("-_id").lean()) as unknown as QuestionSchema;
};
