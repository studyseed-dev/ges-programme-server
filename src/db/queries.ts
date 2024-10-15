import Database from "better-sqlite3";
const db = new Database("ges.db");

export const selectAllUsers = () => {
  const query = "SELECT * FROM users";
  return db.prepare(query).all();
};

console.log(selectAllUsers());
