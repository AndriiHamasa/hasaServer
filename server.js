// 2TSeMZUjnFZqJKB

import mongoose from "mongoose";
import { app } from "./app.js";
import "dotenv/config";

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error.message));
