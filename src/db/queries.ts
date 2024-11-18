import Database from "better-sqlite3";
const db = new Database("ges.db");

export type WeekString =
  | "week1"
  | "week2"
  | "week3"
  | "week4"
  | "week5"
  | "week6"
  | "week7"
  | "week8"
  | "week9"
  | "week10"
  | "week11"
  | "week12";

export const selectAllUsers = () => {
  const query = "SELECT * FROM users";
  return db.prepare(query).all();
};

export const checkUserExists = (userId: string) => {
  const query = "SELECT * FROM users WHERE userid = ?";
  const user = db.prepare(query).get(userId); /** undefined if not found */
  return user
    ? { operation: true, result: user }
    : { operation: false, errorMessage: "User does not exist" };
};

export const selectUser = (userId: string) => {
  const query = "SELECT * FROM users WHERE userid = ?";
  const userData = db.prepare(query).get(userId);
  const queryCourse = "SELECT literacy, numeracy FROM courses WHERE userid = ?";
  const userCourse = db.prepare(queryCourse).get(userId);
  return { userData, userCourse };
};

export const selectUserProgress = (userId: string, course: string, week: string) => {
  const query = `SELECT ${week} FROM progress WHERE userid = ? AND course = ?`;

  const res = db.prepare(query).get(userId, course);
  if (!res) {
    const init = `INSERT INTO progress (userid, course) VALUES (?,?)`;
    db.prepare(init).run(userId, course);
    const updateWeek = `UPDATE progress SET ${week} = ? WHERE userid = ? AND course = ?`;
    const initWeek = JSON.stringify([null, null, null]);
    db.prepare(updateWeek).run(initWeek, userId, course);
  }
  return db.prepare(query).get(userId, course);
};

// check if user has logged in this week
export const checkWeeklyLogin = (userId: string, week: string) => {
  const query = "SELECT * FROM progress WHERE userid = ? AND week = ?";
  return db.prepare(query).get(userId, week);
};

export const selectUserScores = (userId: string, course: string) => {
  const query = "SELECT * FROM scores WHERE userid = ? AND course = ?";
  const res = db.prepare(query).get(userId, course);
  if (!res) {
    /** if undefined means no rows exist for this user yet */
    const init = `INSERT INTO scores (userid, course) VALUES (?, ?)`;
    db.prepare(init).run(userId, course);
  }
  return db.prepare(query).get(userId, course);
};

// This should be called when user passed a tile/town
export const updateUserProgress = (userId: string, week: WeekString, date: string) => {
  const query = `UPDATE progress SET ${week} = ? WHERE userid = ?`;
  return db.prepare(query).run(date, userId);
};

// This should be called when user passed a tile/town
export const updateUserScore = (userId: string, week: WeekString, date: string) => {
  const query = `UPDATE score SET ${week} = ? WHERE userid = ?`;
  return db.prepare(query).run(date, userId);
};

// Combined of the above 2 functions
export const updateUserProgressAndScore = (
  userId: string,
  week: WeekString,
  date: string,
  scores: string,
  course: string
) => {
  const progressQuery = `UPDATE progress SET ${week} = ? WHERE userid = ? AND course = ?`;
  const scoreQuery = `UPDATE scores SET ${week} = ? WHERE userid = ? AND course = ?`;

  const progressStmt = db.prepare(progressQuery);
  const scoreStmt = db.prepare(scoreQuery);

  const progressResult = progressStmt.run(date, userId, course);
  const scoreResult = scoreStmt.run(scores, userId, course);

  return {
    progressResult,
    scoreResult,
  };
};

export const getUserStarsCount = (userId: string) => {
  const query = `SELECT stars from scores WHERE userid = ?`;
  return db.prepare(query).get(userId);
};

export const incrementStars = (userId: string, amountToIncre: number, course: string) => {
  const currentStars = getUserStarsCount(userId) as { stars: number };
  const newStarsCount = currentStars.stars + amountToIncre;
  const query = `UPDATE scores SET stars = ? WHERE userid = ? AND course = ?`;
  return db.prepare(query).run(newStarsCount, userId, course);
};

export const selectUserAttempts = (userId: string, course: string) => {
  const query = "SELECT * FROM attempts WHERE userid = ? AND course = ?";
  return db.prepare(query).get(userId, course);
};

export const updateAttemptCount = (userId: string, week: WeekString, course: string) => {
  const userAttempts = selectUserAttempts(userId, course) as { [key: string]: number };
  if (!userAttempts) {
    /** if empty rows, means user has not attempted any quiz */
    const query = `INSERT INTO attempts (userid, ${week}, course) VALUES (?, ?, ?)`;
    return db.prepare(query).run(userId, 1, course); /** new entry always starts with 1 */
  }

  let currentWeekCount = 0;
  if (userAttempts) currentWeekCount = userAttempts[week];

  const query = `UPDATE attempts SET ${week} = ? WHERE userid = ? AND course = ?`;
  return db.prepare(query).run(currentWeekCount + 1, userId, course);
};
