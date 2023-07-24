import {
  DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "../config/config";
import { Contact } from "../entities/contact.model";
import { DataSource } from "typeorm";

export const ds = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DATABASE,
  entities: [Contact],
  logging: true,
  synchronize: true,
});
