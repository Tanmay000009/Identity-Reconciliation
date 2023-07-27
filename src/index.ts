import { configDotenv } from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { ds } from "./utils/datasource";

configDotenv();

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.use(cors());
app.use(express.json());

ds.initialize().then(() => {
  console.log("Database connected");
});

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>👋🏻 Hello!!</h1>");
});

app.use("/contact", require("./routes/contact.route"));

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
