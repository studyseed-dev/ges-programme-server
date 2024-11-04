import Database from "better-sqlite3";
const db = new Database("ges.db");
// db.pragma("journal_mode = WAL");

// const query = `
//     CREATE TABLE users (
//     userid TEXT PRIMARY KEY,
//     first_name TEXT NOT NULL,
//     last_name TEXT NOT NULL,
//     role TEXT,
//     avatar TEXT DEFAULT 'https://ik.imagekit.io/jbyap95/sam_colon.png'
// )`;

// const query = `
//     DROP TABLE IF EXISTS progress;
//     CREATE TABLE progress (
//       p_id INTEGER PRIMARY KEY AUTOINCREMENT,
//       userid STRING NOT NULL,
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
//       course TEXT NOT NULL,
//       FOREIGN KEY (userid) REFERENCES users(userid)
// )`;

// const query = `
//     DROP TABLE IF EXISTS scores;
//     CREATE TABLE scores (
//       s_id INTEGER PRIMARY KEY AUTOINCREMENT,
//       userid STRING NOT NULL,
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
//       stars INTEGER DEFAULT 0,
//       course TEXT NOT NULL,
//       FOREIGN KEY (userid) REFERENCES users(userid)
// )`;

// const query = `
//     DROP TABLE IF EXISTS attempts;
//     CREATE TABLE attempts (
//       a_id INTEGER PRIMARY KEY AUTOINCREMENT,
//       userid STRING NOT NULL,
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
//       course TEXT NOT NULL,
//       FOREIGN KEY (userid) REFERENCES users(userid)
// )`;

// const query = `
//     DROP TABLE IF EXISTS courses;
//     CREATE TABLE courses (
//       userid STRING PRIMARY KEY,
//       numeracy BOOLEAN DEFAULT FALSE,
//       literacy BOOLEAN DEFAULT FALSE,
//       FOREIGN KEY (userid) REFERENCES users(userid)
// )`;

// db.exec(query);

// const insertProgress = db.prepare(
//   "INSERT INTO progress (userid, first_name, last_name, role) VALUES (?, ?, ?, ?)"
// );

type UserRole = "STUDENT" | "ADMIN";

type User = {
  userid: string;
  first_name: string;
  last_name: string;
  role: UserRole;
};

// const users: Required<User>[] = [
//   // { userid: "STU999", first_name: "Studyseed", last_name: "Samuel", role: "ADMIN" },
//   // { userid: "STU998", first_name: "Studyseed", last_name: "Samantha", role: "ADMIN" },
//   // { userid: "CA01YQ", first_name: "Chloe", last_name: "Adams", role: "STUDENT" },
//   // { userid: "LSO1TH", first_name: "Louise", last_name: "Swain", role: "STUDENT" },
//   // { userid: "DC01HU", first_name: "Dawn", last_name: "Cairns", role: "STUDENT" },
//   // { userid: "EB01UT", first_name: "Essy", last_name: "Baxter", role: "STUDENT" },
//   // { userid: "KM01UD", first_name: "Karen", last_name: "Maxwell", role: "STUDENT" },
//   // { userid: "AA01LZ", first_name: "Abigail", last_name: "Avery", role: "STUDENT" },
//   // { userid: "LG01AB", first_name: "Lucie", last_name: "Gemini", role: "STUDENT" },
//   // { userid: "KG01ZU", first_name: "Kirsty", last_name: "Graham", role: "STUDENT" },
//   // { userid: "MO01ZR", first_name: "Michaela", last_name: "Oates", role: "STUDENT" },
//   // { userid: "DM01QR", first_name: "Dionne", last_name: "Madden", role: "STUDENT" },
//   // { userid: "KC01PQ", first_name: "Kieron", last_name: "Connaghan", role: "STUDENT" },
//   // { userid: "KA01BG", first_name: "Konouz", last_name: "Alhamad", role: "STUDENT" },
//   // { userid: "GC01HS", first_name: "Gina", last_name: "Carter", role: "STUDENT" },
//   // { userid: "JB01ZX", first_name: "Jena", last_name: "Beaumont", role: "STUDENT" },
//   // { userid: "TI01DT", first_name: "Tomasz", last_name: "Ignasiewicz", role: "STUDENT" },
//   // { userid: "HA01HF", first_name: "Hazar", last_name: "Alzaw", role: "STUDENT" },
//   // { userid: "EC01YD", first_name: "Einas", last_name: "Chami", role: "STUDENT" },
//   // { userid: "FU01YF", first_name: "Fiza", last_name: "Usama", role: "STUDENT" },
//   // { userid: "LW01HB", first_name: "Leah", last_name: "Williamson", role: "STUDENT" },
//   // { userid: "CM01DJ", first_name: "Cathy", last_name: "Mayhew", role: "STUDENT" },
//   // { userid: "NU01BS", first_name: "Nese", last_name: "Uygut", role: "STUDENT" },
//   // { userid: "HA01LL", first_name: "Heba", last_name: "Almoallem", role: "STUDENT" },
// ];

// const insertData = db.prepare(
//   "INSERT INTO users (userid, first_name, last_name, role) VALUES (?, ?, ?, ?)"
// );

// for (const user of users) {
//   const { userid, first_name, last_name, role } = user;
//   insertData.run(userid, first_name, last_name, role);
// }

// const insertData = db
//   .prepare("INSERT INTO courses (userid, numeracy, literacy) VALUES (?, ?, ?)")
//   .run("CM01DJ", "TRUE", "FALSE");

db.close(); /** convention to close */
