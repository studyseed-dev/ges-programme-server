import mongoose, { Schema, Document, Model } from "mongoose";
import { Topic } from "../types/topic";

export interface IUser extends Document {
  userid: string;
  first_name: string;
  last_name: string;
  courses: Topic[];
  avatar: string;
  enrolled_courses: string[];
  progress: Partial<ProgressModel>;
}

export type SubjectScores = Record<string, [number, string][]>;

export type ModuleTopic = Record<Topic, SubjectScores>;

export type ProgressModel = Record<string, ModuleTopic>;

export const initializeProgress = (courses: string[]): Partial<ProgressModel> => {
  const initialData: Partial<ProgressModel> = {};

  courses.forEach((course) => {
    initialData[course] = {
      LITERACY: {},
      NUMERACY: {},
    };
  });

  return initialData;
};

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
    enrolled_courses: { type: [String], required: false },
    progress: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  { minimize: false },
);

userSchema.pre("save", function (next) {
  (this as IUser).progress = initializeProgress(this.enrolled_courses);
  next();
});

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
