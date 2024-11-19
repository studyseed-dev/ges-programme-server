import { Router, Request, Response } from "express";
import { runSQLQuery } from "../db/adminQueries";
import dotenv from "dotenv";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
const db = new Database("ges.db");
dotenv.config();
const router = Router();

router.post("/run-sql", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== `Bearer ${process.env.AUTH_TOKEN}`) {
    res.status(401).send({ message: "Unauthorized" });
  }

  const { query, params } = req.body as { query: string; params: any[] };
  try {
    const result = runSQLQuery(query, params);
    res.send(result);
  } catch (error) {
    res.status(400).send({ error, message: "Error executing SQL query" });
  }
});

type Table = {
  name: string;
};

type ExportedData = {
  [tableName: string]: any[];
};

router.get("/export-data", (req: Request, res: Response) => {
  try {
    // Query to select all data from all tables (you can modify to target specific tables)
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as Table[];

    let exportedData = {} as ExportedData;

    // Loop through all tables and fetch the data
    tables.forEach((table) => {
      const tableName = table.name;
      const rows = db.prepare(`SELECT * FROM ${tableName}`).all();
      exportedData[tableName] = rows;
    });

    // Convert the data to JSON
    const jsonData = JSON.stringify(exportedData, null, 2);

    // Optionally, write the JSON data to a file
    const filePath = path.join(__dirname, "exportedData.json");
    fs.writeFileSync(filePath, jsonData);

    // Send the JSON file as a response to the client
    res.download(filePath, "exportedData.json", (err) => {
      if (err) {
        console.error("Error downloading the file:", err);
        res.status(500).send("Server error");
      }
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).send("Server error");
  }
});

export default router;
