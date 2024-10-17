import Database from "better-sqlite3";
const db = new Database("ges.db");

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
