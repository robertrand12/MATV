import { hash } from "argon2";
import { IsEmail, IsPhoneNumber, IsStrongPassword, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import InstrumentType from "./InstrumentType";
import Event from "./Event";
import User from "./User";

@Entity()
@ObjectType()
class Musician extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (u) => u.musicians)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Event, (e) => e.musicians)
  @Field(() => Event)
  event: Event;

  @ManyToOne(() => InstrumentType)
  @Field(() => InstrumentType)
  instrumentType: InstrumentType;
}

export default Musician;
