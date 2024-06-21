import db from "./db";
import fs from "fs";
import path from "path";
import User, { GroupEnum, UserRoleEnum } from "./entities/User";
import { DateTime, PhoneNumber } from "graphql-scalars/typings/mocks";
import InstrumentType, { ToneEnum } from "./entities/InstrumentType";
import BandType from "./entities/BandType";
import Band from "./entities/Band";
import DivisionPart from "./entities/DivisionPart";
import PersonInCharge from "./entities/PersonInCharge";
import Event from "./entities/Event";

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
    group: GroupEnum.A,
    isPasswordInitialized: true,
  });

  const tenorSax = new InstrumentType();
  Object.assign(tenorSax, {
    name: "Saxophone ténor",
    tone: ToneEnum.Sib,
  });

  const altoSax = new InstrumentType();
  Object.assign(altoSax, {
    name: "Saxophone alto",
    tone: ToneEnum.Mib,
  });

  const sopranoSax = new InstrumentType();
  Object.assign(sopranoSax, {
    name: "Saxophone soprano",
    tone: ToneEnum.Sib,
  });

  const baritoneSax = new InstrumentType();
  Object.assign(baritoneSax, {
    name: "Saxophone baryton",
    tone: ToneEnum.Mib,
  });

  const trumpet = new InstrumentType();
  Object.assign(trumpet, {
    name: "Trompette",
    tone: ToneEnum.Sib,
  });

  const horn = new InstrumentType();
  Object.assign(horn, {
    name: "Cor",
    tone: ToneEnum.Fa,
  });

  const trombone = new InstrumentType();
  Object.assign(trombone, {
    name: "Trombone",
    tone: ToneEnum.Ut,
  });

  const euphonium = new InstrumentType();
  Object.assign(euphonium, {
    name: "Euphonium",
    tone: ToneEnum.Sib,
  });

  const sousaphone = new InstrumentType();
  Object.assign(sousaphone, {
    name: "Soubassophone",
    tone: ToneEnum.Sib,
  });

  const banjo = new InstrumentType();
  Object.assign(banjo, {
    name: "Banjo",
    tone: ToneEnum.Ut,
  });

  const guitare = new InstrumentType();
  Object.assign(guitare, {
    name: "Guitare",
    tone: ToneEnum.Ut,
  });

  const bassDrum = new InstrumentType();
  Object.assign(bassDrum, {
    name: "Grosse caisse",
    tone: ToneEnum.Percussion,
  });

  const snareDrum = new InstrumentType();
  Object.assign(snareDrum, {
    name: "Caisse claire",
    tone: ToneEnum.Percussion,
  });

  admin.instrumentTypes = [trumpet, trombone, euphonium, sousaphone, bassDrum];
  admin.preferedInstrument = trumpet;

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

  const beretsVerts = new BandType();
  Object.assign(beretsVerts, {
    name: "La fanfare des bérets verts",
  });

  const pepitosSauvages = new BandType();
  Object.assign(pepitosSauvages, {
    name: "Les pépitos sauvages",
  });

  const sambaDelRio = new BandType();
  Object.assign(sambaDelRio, {
    name: "Samba del Rio",
  });

  const jardiniersChanson = new BandType();
  Object.assign(jardiniersChanson, {
    name: "Les jardiniers de la chanson",
  });

  const gentlemanSwing = new BandType();
  Object.assign(gentlemanSwing, {
    name: "Les gentlemen du swing",
  });

  const balcon = new BandType();
  Object.assign(balcon, {
    name: "La compagnie des balcons",
  });

  const noelFanfare = new BandType();
  Object.assign(noelFanfare, {
    name: "La fanfare du père Noël",
  });

  await beretsVerts.save();
  await pepitosSauvages.save();
  await sambaDelRio.save();
  await jardiniersChanson.save();
  await gentlemanSwing.save();
  await balcon.save();
  await noelFanfare.save();

  const beret4 = new Band();
  Object.assign(beret4, {
    bandType: beretsVerts,
    numberOfMusicians: 4,
  });

  await beret4.save();

  const beret8 = new Band();
  Object.assign(beret8, {
    bandType: beretsVerts,
    numberOfMusicians: 8,
  });

  await beret4.save();

  const voiceABeret4 = new DivisionPart();
  Object.assign(voiceABeret4, {
    nameOfVoice: "1",
    band: beret4,
    numberOfMusicians: 1,
    instrumentTypes: [trumpet],
  });

  const voiceBBeret4 = new DivisionPart();
  Object.assign(voiceBBeret4, {
    nameOfVoice: "2",
    band: beret4,
    numberOfMusicians: 1,
    instrumentTypes: [tenorSax, trombone, euphonium, horn],
  });

  const voiceCBeret4 = new DivisionPart();
  Object.assign(voiceCBeret4, {
    nameOfVoice: "basse",
    band: beret4,
    numberOfMusicians: 1,
    instrumentTypes: [sousaphone, baritoneSax],
  });

  const voiceDBeret4 = new DivisionPart();
  Object.assign(voiceDBeret4, {
    nameOfVoice: "percu",
    band: beret4,
    numberOfMusicians: 1,
    instrumentTypes: [snareDrum],
  });

  const voiceABeret8 = new DivisionPart();
  Object.assign(voiceABeret8, {
    nameOfVoice: "1",
    band: beret8,
    numberOfMusicians: 2,
    instrumentTypes: [trumpet],
  });

  const voiceBBeret8 = new DivisionPart();
  Object.assign(voiceBBeret8, {
    nameOfVoice: "2",
    band: beret8,
    numberOfMusicians: 1,
    instrumentTypes: [altoSax],
  });

  const voiceCBeret8 = new DivisionPart();
  Object.assign(voiceCBeret8, {
    nameOfVoice: "3",
    band: beret8,
    numberOfMusicians: 2,
    instrumentTypes: [tenorSax, trombone, euphonium, horn],
  });

  const voiceDBeret8 = new DivisionPart();
  Object.assign(voiceDBeret8, {
    nameOfVoice: "basse",
    band: beret8,
    numberOfMusicians: 1,
    instrumentTypes: [sousaphone, baritoneSax],
  });

  const voiceEBeret8 = new DivisionPart();
  Object.assign(voiceEBeret8, {
    nameOfVoice: "percu",
    band: beret8,
    numberOfMusicians: 2,
    instrumentTypes: [snareDrum, bassDrum],
  });

  await voiceABeret4.save();
  await voiceBBeret4.save();
  await voiceCBeret4.save();
  await voiceDBeret4.save();
  await voiceABeret8.save();
  await voiceBBeret8.save();
  await voiceCBeret8.save();
  await voiceDBeret8.save();
  await voiceEBeret8.save();

  const personInCharge = new PersonInCharge();
  Object.assign(personInCharge, {
    firstName: "Gérard",
    lastName: "Janvion",
    email: "gege@example.com",
    phoneNumber: "0600000000",
    city: "Auneau",
    zipCode: 28700,
    role: "président du comité des fêtes",
  });

  await personInCharge.save();

  const event = new Event();
  Object.assign(event, {
    name: "Fête du cochon grillé d'Auneau",
    cost: 60000,
    band: beret8,
    address: "place de l'église",
    personInCharge: personInCharge,
    startAt: "2024-07-12T08:00:00.000Z",
    endAt: "2024-07-12T16:00:00.000Z",
  });

  await event.save();

  const antoine = new User();
  Object.assign(antoine, {
    firstName: "Antoine",
    lastName: "Calini",
    email: "antoine@app.com",
    phoneNumber: "0611111111",
    group: GroupEnum.A,
    preferedInstrument: sousaphone,
    instrumentTypes: [sousaphone, banjo, guitare],    
    isPasswordInitialized: true,
  });
  await antoine.save();

  const mandonet = new User();
  Object.assign(mandonet, {
    firstName: "Julien",
    lastName: "Mandonnet",
    email: "jul@app.com",
    phoneNumber: "0611111111",
    group: GroupEnum.A,
    preferedInstrument: tenorSax,
    instrumentTypes: [tenorSax, altoSax, sopranoSax],
    isPasswordInitialized: true,
  });
  await mandonet.save();

  const glain = new User();
  Object.assign(glain, {
    firstName: "Guillaume",
    lastName: "Klein",
    email: "guigui@app.com",
    phoneNumber: "0611111111",
    group: GroupEnum.A,
    preferedInstrument: snareDrum,
    instrumentTypes: [snareDrum, bassDrum],
    isPasswordInitialized: true,
  });
  await glain.save();

  const eddy = new User();
  Object.assign(eddy, {
    firstName: "Eddy",
    lastName: "Eddy",
    email: "eddy@app.com",
    phoneNumber: "0611111111",
    group: GroupEnum.B,
    preferedInstrument: snareDrum,
    instrumentTypes: [snareDrum, bassDrum],
    isPasswordInitialized: true,
  });
  await eddy.save();

  const seb = new User();
  Object.assign(seb, {
    firstName: "Sébastien",
    lastName: "Bahoui",
    email: "seb@app.com",
    phoneNumber: "0611111111",
    group: GroupEnum.B,
    preferedInstrument: trumpet,
    instrumentTypes: [trumpet],
    isPasswordInitialized: true,
  });
  await seb.save();

  const camille = new User();
  Object.assign(camille, {
    firstName: "Camille",
    lastName: "Poupout",
    email: "camille@app.com",
    phoneNumber: "0611111111",
    group: GroupEnum.B,
    preferedInstrument: altoSax,
    instrumentTypes: [altoSax, tenorSax],
    isPasswordInitialized: true,
  });
  await camille.save();

  const bertrand = new User();
  Object.assign(bertrand, {
    firstName: "Bertrand",
    lastName: "Roger",
    email: "bertrand@app.com",
    phoneNumber: "0611111111",
    group: GroupEnum.B,
    preferedInstrument: altoSax,
    instrumentTypes: [altoSax, tenorSax, baritoneSax, bassDrum],
    isPasswordInitialized: true,
  });
  await bertrand.save();

  const olivier = new User();
  Object.assign(olivier, {
    firstName: "Olivier",
    lastName: "Albert",
    email: "olivier@app.com",
    phoneNumber: "0611111111",
    group: GroupEnum.B,
    preferedInstrument: snareDrum,
    instrumentTypes: [snareDrum, bassDrum],
    isPasswordInitialized: true,
  });
  await olivier.save();

  const thomas = new User();
  Object.assign(thomas, {
    firstName: "Thomas",
    lastName: "Beauregard",
    email: "tom@app.com",
    phoneNumber: "0611111111",
    group: GroupEnum.B,
    preferedInstrument: trombone,
    instrumentTypes: [trombone, sousaphone],
    isPasswordInitialized: true,
  });
  await thomas.save();

  await db.destroy();
  console.log("done !");
}

main();
