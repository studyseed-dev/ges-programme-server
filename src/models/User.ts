import mongoose, { Schema, Document, Model } from "mongoose";
import { Course } from "../types/course";
import { Topic } from "../types/topic";

export interface IUser extends Document {
  userid: string;
  first_name: string;
  last_name: string;
  courses: Topic[];
  avatar: string;
  enrolled_courses: Course[];
  progress: Partial<ProgressModel>;
}

// course module name (EL1, L12...) is key and value is an array of tuples
// tuple's first element is the score and second element is the date
export type SubjectScores = Record<string, [number, string][]>;

export type ModuleTopic = Record<Topic, SubjectScores>;

export type ProgressModel = Record<Course, ModuleTopic>;

// Helper function to generate initial data structure
export const initializeProgress = (courses: Course[]): Partial<ProgressModel> => {
  const initialData = {} as Partial<ProgressModel>; // use type assertion here to tell TS that the empty object will eventually have the shape of ProgressModel

  courses.forEach((course) => {
    initialData[course] = {
      LITERACY: {},
      NUMERACY: {},
    };
  });
  return initialData;
};

// Define the User Schema
// note the minimize: false arg, mongoose removes empty object by default, this overrides it
const userSchema = new Schema<IUser>(
  {
    userid: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    courses: { type: [String], required: true, enum: Topic },
    avatar: {
      type: String,
      required: false,
      default: "https://ik.imagekit.io/jbyap95/sam_colon.png",
    },
    enrolled_courses: { type: [String], required: false, enum: Course },
    progress: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  { minimize: false },
);

userSchema.pre("save", function (next) {
  // Why not just use default values in the schema?
  // because we need the enrolled courses array from request body
  (this as IUser).progress = initializeProgress(this.enrolled_courses);
  next();
});

// Create the User model
export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
