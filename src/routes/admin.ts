import { Router, Request, Response } from "express";
import { runSQLQuery } from "../db/adminQueries";
import dotenv from "dotenv";
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

export default router;
