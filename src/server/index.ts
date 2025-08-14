// src/server/index.ts
import express from "express";
import bodyParser from "body-parser";
import { echoHandler } from "../features/echo/apis/echo";
import { mp3Handler } from "../features/mp3-downloader/apis/mp3"


const app = express();
app.use(bodyParser.json());

app.all("/api/echo", echoHandler);
app.all("/api/mp3", mp3Handler);

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
