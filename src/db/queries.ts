import Database from "better-sqlite3";
const db = new Database("ges.db");

type WeekString =
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
  return db.prepare(query).get(userId);
};

export const selectUserProgress = (userId: string) => {
  const query = "SELECT * FROM progress WHERE userid = ?";

  const res = db.prepare(query).get(userId);
  if (!res) {
    const init = `INSERT INTO progress (userid) VALUES (?)`;
    db.prepare(init).run(userId);
  }
  return db.prepare(query).get(userId);
};

// check if user has logged in this week
export const checkWeeklyLogin = (userId: string, week: string) => {
  const query = "SELECT * FROM progress WHERE userid = ? AND week = ?";
  return db.prepare(query).get(userId, week);
};

export const selectUserScores = (userId: string) => {
  const query = "SELECT * FROM scores WHERE userid = ?";
  const res = db.prepare(query).get(userId);
  if (!res) {
    /** if undefined means no rows exist for this user yet */
    const init = `INSERT INTO scores (userid) VALUES (?)`;
    db.prepare(init).run(userId);
  }
  return db.prepare(query).get(userId);
};

export const selectUserAttempts = (userId: string) => {
  const query = "SELECT * FROM attempts WHERE userid = ?";
  const res = db.prepare(query).get(userId);
  if (!res) {
    /** if undefined means no rows exist for this user yet */
    const init = `INSERT INTO attempts (userid) VALUES (?)`;
    db.prepare(init).run(userId);
  }
  return db.prepare(query).get(userId);
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
export const updateUserProgressAndScore = (userId: string, week: WeekString, date: string) => {
  const progressQuery = `UPDATE progress SET ${week} = ? WHERE userid = ?`;
  const scoreQuery = `UPDATE scores SET ${week} = ? WHERE userid = ?`;

  const progressStmt = db.prepare(progressQuery);
  const scoreStmt = db.prepare(scoreQuery);

  const progressResult = progressStmt.run(date, userId);
  const scoreResult = scoreStmt.run(date, userId);

  return {
    progressResult,
    scoreResult,
  };
};

export const getUserStarsCount = (userId: string) => {
  const query = `SELECT stars from scores WHERE userid = ?`;
  return db.prepare(query).get(userId);
};

export const incrementStars = (userId: string, amountToIncre: number) => {
  const currentStars = getUserStarsCount(userId) as number;
  const newStarsCount = currentStars + amountToIncre;
  const query = `UPDATE score SET stars = ? WHERE userid = ?`;
  return db.prepare(query).run(newStarsCount, userId);
};

export const updateAttemptCount = (userId: string, week: WeekString, newCount: string) => {
  const userAttempts = selectUserAttempts(userId);
  if (!userAttempts) {
    /** if empty rows, means user has not attempted any quiz */
    const query = `INSERT INTO attempts (userid, ${week}) VALUES (?, ?)`;
    return db.prepare(query).run(userId, 1); /** new entry always starts with 1 */
  }

  let currentWeekCount = 0;
  if (userAttempts) {
    currentWeekCount = (userAttempts as Record<string, number>)[week];
  }
  const query = `UPDATE attempts SET ${week} = ? WHERE userid = ?`;
  return db.prepare(query).run(currentWeekCount + 1, userId);
};
