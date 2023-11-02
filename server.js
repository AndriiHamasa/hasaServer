// 2TSeMZUjnFZqJKB

import mongoose from "mongoose";
import { app } from "./app.js";
import "dotenv/config";

const { DB_HOST } = process.env;

// process.env.PORT || 3000;
const port = process.env.PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(port, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => console.log(error.message));
