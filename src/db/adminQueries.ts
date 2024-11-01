import Database from "better-sqlite3";
import { run } from "node:test";
const db = new Database("ges.db");

export function runSQLQuery(query: string, params: any[] = []): any {
  try {
    const stmt = db.prepare(query);
    if (query.trim().toLowerCase().startsWith("select")) {
      return stmt.all(...params);
    } else {
      const info = stmt.run(...params);
      return { changes: info.changes, lastInsertRowid: info.lastInsertRowid };
    }
  } catch (error) {
    throw new Error(`Admin SQL Error: ${error}`);
  }
}
