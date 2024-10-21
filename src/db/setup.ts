import Database from "better-sqlite3";
const db = new Database("ges.db");
// db.pragma("journal_mode = WAL");

// const query = `
//     CREATE TABLE users (
//     userid STRING PRIMARY KEY,
//     first_name STRING NOT NULL,
//     last_name STRING NOT NULL,
//     role STRING
// )`;

// const query = `
//     DROP TABLE IF EXISTS progress;
//     CREATE TABLE progress (
//       userid STRING PRIMARY KEY,
//       week1 TEXT DEFAULT NULL,
//       week2 TEXT DEFAULT NULL,
//       week3 TEXT DEFAULT NULL,
//       week4 TEXT DEFAULT NULL,
//       week5 TEXT DEFAULT NULL,
//       week6 TEXT DEFAULT NULL,
//       week7 TEXT DEFAULT NULL,
//       week8 TEXT DEFAULT NULL,
//       week9 TEXT DEFAULT NULL,
//       week10 TEXT DEFAULT NULL,
//       week11 TEXT DEFAULT NULL,
//       week12 TEXT DEFAULT NULL,
//       FOREIGN KEY (userid) REFERENCES users(userid)
// )`;

const query = `
    DROP TABLE IF EXISTS scores;
    CREATE TABLE scores (
      userid STRING PRIMARY KEY,
      week1 TEXT DEFAULT NULL,
      week2 TEXT DEFAULT NULL,
      week3 TEXT DEFAULT NULL,
      week4 TEXT DEFAULT NULL,
      week5 TEXT DEFAULT NULL,
      week6 TEXT DEFAULT NULL,
      week7 TEXT DEFAULT NULL,
      week8 TEXT DEFAULT NULL,
      week9 TEXT DEFAULT NULL,
      week10 TEXT DEFAULT NULL,
      week11 TEXT DEFAULT NULL,
      week12 TEXT DEFAULT NULL,
      stars INTEGER DEFAULT 0,
      FOREIGN KEY (userid) REFERENCES users(userid)
)`;

// const query = `
//     DROP TABLE IF EXISTS attempts;
//     CREATE TABLE attempts (
//       userid STRING PRIMARY KEY,
//       week1 INTEGER DEFAULT 0,
//       week2 INTEGER DEFAULT 0,
//       week3 INTEGER DEFAULT 0,
//       week4 INTEGER DEFAULT 0,
//       week5 INTEGER DEFAULT 0,
//       week6 INTEGER DEFAULT 0,
//       week7 INTEGER DEFAULT 0,
//       week8 INTEGER DEFAULT 0,
//       week9 INTEGER DEFAULT 0,
//       week10 INTEGER DEFAULT 0,
//       week11 INTEGER DEFAULT 0,
//       week12 INTEGER DEFAULT 0,
//       FOREIGN KEY (userid) REFERENCES users(userid)
// )`;

db.exec(query);

// const insertProgress = db.prepare(
//   "INSERT INTO progress (userid, first_name, last_name, role) VALUES (?, ?, ?, ?)"
// );

// type UserRole = "STUDENT" | "ADMIN";

// type User = {
//   userid: string;
//   first_name: string;
//   last_name: string;
//   role: UserRole;
// };

// const adminUsers: Omit<User, "first_name" | "last_name">[] = [
//   { userid: "ADMIN001", role: "ADMIN" },
//   { userid: "ADMIN002", role: "ADMIN" },
// ];

// const users: Required<User>[] = [
//   { userid: "STU999", first_name: "Studyseed", last_name: "Samuel", role: "ADMIN" },
//   { userid: "STU998", first_name: "Studyseed", last_name: "Samantha", role: "ADMIN" },
// ];

// const insertData = db.prepare(
//   "INSERT INTO users (userid, first_name, last_name, role) VALUES (?, ?, ?, ?)"
// );

// for (const user of users) {
//   const { userid, first_name, last_name, role } = user;
//   insertData.run(userid, first_name, last_name, role);
// }

db.close(); /** convention to close */
