import express from "express";
const app = express();

const PORT = process.env.PORT_URI || 8000;

//!middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//!server status
app.get("/", (req, res) => {
  res.json({
    message: "server is live",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running on port http://localhost:${PORT}`);
});
