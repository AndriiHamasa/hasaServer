import express from "express"
import fetch from "node-fetch"
import "dotenv/config"
import logger from "morgan";
import cors from "cors";
import isSiteOwner from "./middlewares/isSiteOwner.js";
import { controllers } from "./controllers/index.js";

export const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Обработка POST-запросов
app.post('/send-message', isSiteOwner, controllers.sendMessage);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


