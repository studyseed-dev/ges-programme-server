import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import loginRouter from "./src/routes/auth";
// import dotenv from "dotenv";
// dotenv.config();
// import morgan from "morgan";

const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(morgan("dev"));
app.use("/auth", loginRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
