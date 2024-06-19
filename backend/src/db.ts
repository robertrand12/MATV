import { DataSource } from "typeorm";
import env from "./env";
import User from "./entities/User";
import InstrumentType from "./entities/InstrumentType";
import BandType from "./entities/BandType";
import Band from "./entities/Band";
import DivisionPart from "./entities/DivisionPart";
import PersonInCharge from "./entities/PersonInCharge";
import Event from "./entities/Event";
import Musician from "./entities/Musician";

const db = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [User, InstrumentType, BandType, Band, DivisionPart, Event, PersonInCharge, Musician],
  synchronize: true,
  logging: env.NODE_ENV !== "test",
});

export async function clearDB() {
  const entities = db.entityMetadatas;
  const tableNames = entities
    .map((entity) => `"${entity.tableName}"`)
    .join(", ");
  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}

export default db;
