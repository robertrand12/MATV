import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Event from "./Event";

@Entity()
@ObjectType()
class PersonInCharge extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phoneNumber: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column({ type: "int" })
  zipCode: number;

  @Field()
  @Column()
  role: string;

  @OneToMany(() => Event, (e) => e.personInCharge)
  events: Event[];
}

export default PersonInCharge;
