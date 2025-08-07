// src/server/index.ts
import express from "express";
import bodyParser from "body-parser";
import { echoHandler } from "../features/echo/apis/echo";
const app = express();
app.use(bodyParser.json());

app.all("/api/echo", echoHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
