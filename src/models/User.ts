import mongoose, { Schema, Document, Model } from "mongoose";
import { TOTAL_NUM_OF_QUESTIONS } from "../utils/constants";
// This model is for GES programme
// Define interface for User Document
interface IUser extends Document {
  userid: string;
  first_name: string;
  last_name: string;
  courses: string[];
  avatar: string;
  progress: Record<string, Record<string, (Date | null)[]>>;
  attempts: Record<string, Record<string, number>>;
  scores: Record<string, Record<string, number[]>>;
  enrolled_courses: string[];
}

// Helper function to generate initial data structure
const initializeData = <T>(
  courses: string[],
  initialValue: T
): Record<string, Record<string, T>> => {
  const weeks = Array.from({ length: TOTAL_NUM_OF_QUESTIONS }, (_, i) => `week${i + 1}`);
  const initialData: Record<string, Record<string, T>> = {};

  courses.forEach((course) => {
    initialData[course] = {};
    weeks.forEach((week) => {
      initialData[course][week] = initialValue;
    });
  });

  return initialData;
};

const initializeProgress = (courses: string[]): Record<string, Record<string, (Date | null)[]>> => {
  return initializeData(courses, [null]);
};

const initializeScores = (courses: string[]): Record<string, Record<string, number[]>> => {
  return initializeData(courses, [0]);
};

const initializeAttempts = (courses: string[]): Record<string, Record<string, number>> => {
  return initializeData(courses, 0);
};

// Define the User Schema
const userSchema = new Schema<IUser>({
  userid: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  courses: { type: [String], required: true },
  avatar: {
    type: String,
    required: false,
    default: "https://ik.imagekit.io/jbyap95/sam_colon.png",
  },
  progress: {
    type: Object, // Use regular Object type instead of Map
    default: {},
  },
  attempts: {
    type: Object,
    default: {},
  },
  scores: {
    type: Object,
    default: {},
  },
  enrolled_courses: { type: [String], required: false },
});

// Pre-save hook to initialize the `progress` field
userSchema.pre("save", function (next) {
  if (!this.progress || Object.keys(this.progress).length === 0) {
    this.progress = initializeProgress(this.courses);
  }
  if (!this.scores || Object.keys(this.scores).length === 0) {
    this.scores = initializeScores(this.courses);
  }
  if (!this.attempts || Object.keys(this.attempts).length === 0) {
    this.attempts = initializeAttempts(this.courses);
  }
  next();
});

// Create the User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
