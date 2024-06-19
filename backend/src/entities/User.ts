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
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import InstrumentType from "./InstrumentType";
import Event from "./Event";
import Musician from "./Musician";

export enum UserRoleEnum {
  Admin = "admin",
  Musician = "musician",
}

export enum GroupEnum {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F"
}

@Entity()
@ObjectType()
class User extends BaseEntity {
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.hashedPassword = await hash(this.password);
  }

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  phoneNumber: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true, enum: GroupEnum })
  group?: GroupEnum;

  @Column()
  hashedPassword: string;

  @Column({
    default:
      "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
  })
  @Field({ nullable: true })
  avatarUrl: string;

  @Field()
  @Column({ enum: UserRoleEnum, default: UserRoleEnum.Musician })
  role: UserRoleEnum;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address?: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updateddAt: Date;

  @JoinTable()
  @ManyToMany(() => InstrumentType, (i) => i.users, {
    cascade: true,
  })
  @Field(() => [InstrumentType])
  instrumentTypes: InstrumentType[];

  @OneToMany(() => Musician, (m) => m.user)
  @Field(() => [Musician])
  musicians: Musician[];

  @ManyToMany(() => Event, (e) => e.notAvailableUsers)
  @Field(()=>[Event])
  notAvailableEvents: Event[];

  @ManyToOne(() => InstrumentType)
  @Field(() => InstrumentType)
  preferedInstrument: InstrumentType;
}

@InputType()
export class NewUserInput {
  @IsEmail()
  @Field()
  email: string;

  @Length(2, 30)
  @Field()
  firstName: string;
  
  @Length(2, 30)
  @Field()
  lastName: string;

  @IsPhoneNumber('FR')
  @Field()
  phoneNumber: string;

  @Field({nullable: true})
  group: string
}

export default User;
