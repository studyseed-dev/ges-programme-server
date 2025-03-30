import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import getRouter from "./src/routes/mdb-get";
import postRouter from "./src/routes/mdb-post";
import putRouter from "./src/routes/mdb-put";
import MDBAuthRouter from "./src/auth/loginMDB";
import mongoose from "mongoose";
import dotenv from "dotenv";
import YAML from "js-yaml";
import swaggerUi, { JsonObject } from "swagger-ui-express";
import fs from "fs";

dotenv.config();

const app = express();
const port = 3001;
const swaggerDocument = YAML.load(fs.readFileSync("./src/openapi/ges.yaml", "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument as JsonObject));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/mdb-read", getRouter);
app.use("/mdb-create", postRouter);
app.use("/mdb-update", putRouter);
app.use("/authdb", MDBAuthRouter);

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("Connection error:", err));
