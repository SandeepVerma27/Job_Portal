// imports packages
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
// files imports
import connectDB from "./config/db.js";
// routes immports
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoute.js";
import jobRoutes from "./routes/jobsRoutes.js";
const app = express();

// config
dotenv.config();
// mongodb connect
connectDB();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

// validation middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(8080, () => {
  console.log(
    `Server is ${process.env.DEV_MODE} running at http://localhost:${PORT}`
      .yellow
  );
});
