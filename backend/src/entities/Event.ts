import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Band from "./Band";
import PersonInCharge from "./PersonInCharge";
import User from "./User";

export enum StatusEnum {
  Option = "Option",
  Sent = "Devis envoyé",
  Accepted = "Devis signé",
  Factured = "Facture envoyée",
  Payed = "Facture payée",
}

@Entity()
@ObjectType()
class Event extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  name: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updateddAt: Date;

  @Field()
  @Column({ enum: StatusEnum, default: StatusEnum.Option })
  role: StatusEnum;

  @Column({ type: "int" })
  @Field()
  cost: number;

  @ManyToOne(() => Band, (b) => b.events)
  @Field(() => Band)
  band: Band;

  @Field()
  @Column()
  address: string;

  @ManyToOne(() => PersonInCharge, (p) => p.events)
  @Field(() => PersonInCharge)
  personInCharge: PersonInCharge;

  @Column({ type: "date" })
  @Field()
  startAt: Date;

  @Column({ type: "date" })
  @Field()
  endAt: Date;

  @JoinTable()
  @ManyToMany(() => User, (u) => u.events, {
    cascade: true,
  })
  @Field(() => [User])
  users: User[];
}

export default Event;
