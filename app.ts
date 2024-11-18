import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import loginRouter from "./src/routes/auth";
import selectRouter from "./src/routes/selectData";
import updateRouter from "./src/routes/updateData";
import adminRouter from "./src/routes/admin";
import MDBRouter from "./src/routes/mdbRoute";
import MDBAuthRouter from "./src/auth/loginMDB";
import mongoose from "mongoose";
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
app.use("/get", selectRouter);
app.use("/update", updateRouter);
app.use("/admin", adminRouter);
app.use("/mdb", MDBRouter);
app.use("/authdb", MDBAuthRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("Connection error:", err));
