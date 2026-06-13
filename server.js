import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();

const PORT = process.env.PORT_URI || 8000;
//!DB connection
import dbConnect from "./src/config/dbConfig.js";

dbConnect()
  .then(() => {
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

//!middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//!api endpoints
import authRoute from "./src/routes/authRoutes.js";
app.use("/api/v1/auth", authRoute);

//!server status
app.get("/", (req, res) => {
  res.json({
    message: "server is live",
  });
});
