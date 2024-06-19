import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

export enum ToneEnum {
  Sib = "sib",
  Mib = "mib",
  Ut = "ut",
  La = "la",
  Fa = "fa",
  Percussion = "percussions"
}

@Entity()
@ObjectType()
class InstrumentType extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ enum: ToneEnum})
  tone: ToneEnum;

  @ManyToMany(() => User, (u) => u.instrumentTypes)
  users: User[];
}

export default InstrumentType;
