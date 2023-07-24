import { configDotenv } from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";

configDotenv();

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>👋🏻 Hello from Glocal-Shop</h1>");
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
