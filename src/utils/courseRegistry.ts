import { AdminQuestions } from "../models/AdminQuestions";
import { CourseRegistry } from "../models/CourseRegistry";
import { Course } from "../types/course";
import { ensureLegacyCoursesSeeded } from "./courseRegistrySeed";
import { getQuestionCollection } from "./questionCollection";

export type CourseRegistryItem = {
  code: string;
  displayName: string;
  topics: string[];
  createdAt?: Date;
};

export type ResolvedCourseTopic = {
  course: string;
  topic: string;
  isAdmin: boolean;
};

export async function listCourses(): Promise<CourseRegistryItem[]> {
  await ensureLegacyCoursesSeeded();

  const courses = await CourseRegistry.find().sort({ code: 1 }).lean();

  return courses.map((course) => ({
    code: course.code,
    displayName: course.displayName,
    topics: course.topics,
    createdAt: course.createdAt,
  }));
}

export async function resolveCourseTopic(
  course: string,
  topic: string,
): Promise<ResolvedCourseTopic> {
  const normalizedCourse = course.toUpperCase();
  const normalizedTopic = topic.toUpperCase();

  if (normalizedCourse === Course.ADMIN) {
    return { course: normalizedCourse, topic: normalizedTopic, isAdmin: true };
  }

  await ensureLegacyCoursesSeeded();

  const registryCourse = await CourseRegistry.findOne({ code: normalizedCourse });

  if (!registryCourse) {
    throw new Error(`Unknown course: ${course}`);
  }

  if (!registryCourse.topics.includes(normalizedTopic)) {
    throw new Error(`Topic "${topic}" is not configured for course "${course}"`);
  }

  return { course: normalizedCourse, topic: normalizedTopic, isAdmin: false };
}

export function getRegistryQuestionCollection(course: string, topic: string) {
  return getQuestionCollection(course, topic);
}

export function getAdminQuestionsCollection() {
  return AdminQuestions;
}
