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
import { ObjectId } from "../types";

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
  password: string = "UserInitialized1!";

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

  @Column({ default: false })
  isPasswordInitialized: boolean;

  @Column({ nullable: true, type: "varchar", unique: true })
  passwordInitializeToken?: string | null;

  @Column({ nullable: true, type: "varchar", unique: true })
  resetPasswordToken?: string | null;

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

  @Field()
  phoneNumber: string;

  @Field({nullable: true})
  group: string

  @Field(() => [ObjectId], { nullable: true })
  instrumentTypes?: ObjectId[];

  @Field(() => ObjectId)
  preferedInstrument: ObjectId;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;
}

@InputType()
export class ResetPasswordRequestInput {
  @Field()
  email: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsStrongPassword()
  password: string;
}

export default User;
