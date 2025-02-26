import mongoose, { Schema, Document, Model } from "mongoose";
// This model is for GES programme
// Define interface for User Document
export interface IUser extends Document {
  userid: string;
  first_name: string;
  last_name: string;
  courses: string[];
  avatar: string;
  enrolled_courses: string[];
  progress: Partial<ProgressModel>;
}

export interface SubjectScores {
  // course module is key and value is an array of tuples
  // first element is the score and second element is the date
  [key: string]: [number, string][];
}

export interface ModuleTopic {
  LITERACY: SubjectScores;
  NUMERACY: SubjectScores;
}

export interface ProgressModel {
  GES: ModuleTopic;
  GES2: ModuleTopic;
  // Add more keys as needed
}

export type Courses = "GES" | "GES2";

// Helper function to generate initial data structure
export const initializeProgress = (courses: Courses[]): Partial<ProgressModel> => {
  const initialData = {} as ProgressModel; // use type assertion here to tell TS that the empty object will eventually have the shape of ProgressModel

  // courses can have ["GES", "GES2"]
  courses.forEach((course: Courses) => {
    initialData[course] = {
      LITERACY: {},
      NUMERACY: {},
    };
  });
  return initialData;
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
  enrolled_courses: { type: [String], required: false },
  progress: {
    type: Schema.Types.Mixed,
    required: false,
  },
});

// Create the User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
