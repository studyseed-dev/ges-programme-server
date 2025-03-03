import mongoose, { Schema, Document, Model } from "mongoose";
// This model is for GES programme
// Define interface for User Document
export const coursesArray = ['GES', 'GES2'] as const;
export const topicArray = ['LITERACY', 'NUMERACY'] as const;
export interface IUser extends Document {
  userid: string;
  first_name: string;
  last_name: string;
  courses: string[];
  avatar: string;
  enrolled_courses: Courses[];
  progress: Partial<ProgressModel>;
}

export interface SubjectScores {
  // course module is key and value is an array of tuples
  // first element is the score and second element is the date
  [key: string]: [number, string][];
}
export type Topics = typeof topicArray[number];

export type ModuleTopic = {
  [key in Topics]: SubjectScores;
}

export interface ProgressModel {
  GES: ModuleTopic;
  GES2: ModuleTopic;
  // Add more keys as needed
}

export type Courses = typeof coursesArray[number];

// Helper function to generate initial data structure
export const initializeProgress = (courses: Courses[]): Partial<ProgressModel> => {
  const initialData = {} as Partial<ProgressModel>; // use type assertion here to tell TS that the empty object will eventually have the shape of ProgressModel

  courses.forEach((course: Courses) => {
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
    courses: { type: [String], required: true, enum: topicArray },
    avatar: {
      type: String,
      required: false,
      default: "https://ik.imagekit.io/jbyap95/sam_colon.png",
    },
    enrolled_courses: { type: [String], required: false, enum: coursesArray },
    progress: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  { minimize: false }
);

userSchema.pre("save", function (next) {
  // Why not just use default values in the schema?
  // because we need the enrolled courses array from request body
  ((this as IUser).progress) = initializeProgress(this.enrolled_courses);
  next();
});

// Create the User model
export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
