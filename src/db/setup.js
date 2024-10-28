"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var better_sqlite3_1 = require("better-sqlite3");
var db = new better_sqlite3_1.default("ges.db");
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
var query = "\n    DROP TABLE IF EXISTS scores;\n    CREATE TABLE scores (\n      userid STRING PRIMARY KEY,\n      week1 TEXT DEFAULT NULL,\n      week2 TEXT DEFAULT NULL,\n      week3 TEXT DEFAULT NULL,\n      week4 TEXT DEFAULT NULL,\n      week5 TEXT DEFAULT NULL,\n      week6 TEXT DEFAULT NULL,\n      week7 TEXT DEFAULT NULL,\n      week8 TEXT DEFAULT NULL,\n      week9 TEXT DEFAULT NULL,\n      week10 TEXT DEFAULT NULL,\n      week11 TEXT DEFAULT NULL,\n      week12 TEXT DEFAULT NULL,\n      stars INTEGER DEFAULT 0,\n      FOREIGN KEY (userid) REFERENCES users(userid)\n)";
// const adminUsers: Omit<User, "first_name" | "last_name">[] = [
//   { userid: "ADMIN001", role: "ADMIN" },
//   { userid: "ADMIN002", role: "ADMIN" },
// ];
var users = [
    // { userid: "STU999", first_name: "Studyseed", last_name: "Samuel", role: "ADMIN" },
    // { userid: "STU998", first_name: "Studyseed", last_name: "Samantha", role: "ADMIN" },
    { userid: "CA01YQ", first_name: "Chloe", last_name: "Adams", role: "STUDENT" },
    { userid: "LSO1TH", first_name: "Louise", last_name: "Swain", role: "STUDENT" },
    { userid: "DC01HU", first_name: "Dawn", last_name: "Cairns", role: "STUDENT" },
    { userid: "EB01UT", first_name: "Essy", last_name: "Baxter", role: "STUDENT" },
    { userid: "KM01UD", first_name: "Karen", last_name: "Maxwell", role: "STUDENT" },
    { userid: "AA01LZ", first_name: "Abigail", last_name: "Avery", role: "STUDENT" },
    { userid: "LG01AB", first_name: "Lucie", last_name: "Gemini", role: "STUDENT" },
    { userid: "KG01ZU", first_name: "Kirsty", last_name: "Graham", role: "STUDENT" },
    { userid: "MO01ZR", first_name: "Michaela", last_name: "Oates", role: "STUDENT" },
    { userid: "DM01QR", first_name: "Dionne", last_name: "Madden", role: "STUDENT" },
    { userid: "KC01PQ", first_name: "Kieron", last_name: "Connaghan", role: "STUDENT" },
];
var insertData = db.prepare("INSERT INTO users (userid, first_name, last_name, role) VALUES (?, ?, ?, ?)");
for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
    var user = users_1[_i];
    var userid = user.userid, first_name = user.first_name, last_name = user.last_name, role = user.role;
    insertData.run(userid, first_name, last_name, role);
}
db.close(); /** convention to close */
