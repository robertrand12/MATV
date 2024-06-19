import db from "./db";
import fs from "fs";
import path from "path";
import User, { GroupEnum, UserRoleEnum } from "./entities/User";
import { PhoneNumber } from "graphql-scalars/typings/mocks";
import InstrumentType, { ToneEnum } from "./entities/InstrumentType";

export async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("SET session_replication_role = 'replica'");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`)
    )
  );
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)
    )
  );
  await runner.query("SET session_replication_role = 'origin'");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();

  const admin = new User();
  Object.assign(admin, {
    firstName: "Julien",
    lastName: "Lambert",
    email: "chouchou@app.com",
    password: "ChouchouDu28!",
    phoneNumber: "0611111111",
    role: UserRoleEnum.Admin,
    group: GroupEnum.A
  });

  const tenorSax = new InstrumentType();
  Object.assign(tenorSax, {
    name: "Saxophone ténor",
    tone: ToneEnum.Sib
  })

  const altoSax = new InstrumentType();
  Object.assign(altoSax, {
    name: "Saxophone alto",
    tone: ToneEnum.Mib
  })

  const sopranoSax = new InstrumentType();
  Object.assign(sopranoSax, {
    name: "Saxophone soprano",
    tone: ToneEnum.Sib
  })

  const baritoneSax = new InstrumentType();
  Object.assign(baritoneSax, {
    name: "Saxophone baryton",
    tone: ToneEnum.Mib
  })

  const trumpet = new InstrumentType();
  Object.assign(trumpet, {
    name: "Trompette",
    tone: ToneEnum.Sib
  })

  const horn = new InstrumentType();
  Object.assign(horn, {
    name: "Cor",
    tone: ToneEnum.Fa
  })

  const trombone = new InstrumentType();
  Object.assign(trombone, {
    name: "Trombone",
    tone: ToneEnum.Ut
  })

  const euphonium = new InstrumentType();
  Object.assign(euphonium, {
    name: "Euphonium",
    tone: ToneEnum.Sib
  })

  const sousaphone = new InstrumentType();
  Object.assign(sousaphone, {
    name: "Soubassophone",
    tone: ToneEnum.Sib
  })

  const banjo = new InstrumentType();
  Object.assign(banjo, {
    name: "Banjo",
    tone: ToneEnum.Ut
  })

  const guitare = new InstrumentType();
  Object.assign(guitare, {
    name: "Guitare",
    tone: ToneEnum.Ut
  })

  const bassDrum = new InstrumentType();
  Object.assign(bassDrum, {
    name: "Grosse caisse",
    tone: ToneEnum.Percussion
  })

  const snareDrum = new InstrumentType();
  Object.assign(snareDrum, {
    name: "Caisse claire",
    tone: ToneEnum.Percussion
  })

  admin.instrumentTypes = [trumpet, trombone, euphonium, sousaphone, bassDrum];

  await admin.save();
  await tenorSax.save();
  await altoSax.save();
  await baritoneSax.save();
  await sopranoSax.save();
  await trumpet.save();
  await trombone.save();
  await euphonium.save();
  await horn.save();
  await sousaphone.save();
  await banjo.save();
  await guitare.save();
  await bassDrum.save();
  await snareDrum.save();

  await db.destroy();
  console.log("done !");
}

main();
