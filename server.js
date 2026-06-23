import express from "express";
import dotenv from "dotenv";
import dbConnect from "./src/config/dbConfig.js";
import { responseClient } from "./src/middleware/responseClient.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import authRoute from "./src/routes/authRoutes.js";
import userRoute from "./src/routes/userRoutes.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT_URI || 8000;

//!middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//!api endpoints

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

//!server status
app.get("/", (req, res) => {
  const message = "server is live";
  responseClient({ req, res, message });
});

//!error handler

app.use(errorHandler);

//!DB connection

dbConnect()
  .then(() => {
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
