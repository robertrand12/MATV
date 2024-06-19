import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Band from "./Band";
import PersonInCharge from "./PersonInCharge";
import User from "./User";
import Musician from "./Musician";

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
  updatedAt: Date;

  @Field()
  @Column({ enum: StatusEnum, default: StatusEnum.Option })
  status: StatusEnum;

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

  @Column()
  @Field()
  startAt: Date;

  @Column()
  @Field()
  endAt: Date;

  @OneToMany(() => Musician, (m) => m.event)
  @Field(() => [Musician])
  musicians: Musician[];

  @JoinTable()
  @ManyToMany(() => User, (u) => u.notAvailableEvents, {
    cascade: true,
  })
  @Field(() => [User])
  notAvailableUsers: User[];
}

export default Event;
