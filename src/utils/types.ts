export type GameData = {
  [key: string]:
    | {
        [key: string]: string;
      }
    | string
    | {};
};

export type CourseEnrolled = "GES" | "GES2";
