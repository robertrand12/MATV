import { hash } from "argon2";
import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum UserRole {
  Admin = "admin",
  Musician = "musician",
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
  @Column()
  email: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Column()
  hashedPassword: string;

  @Column({
    default:
      "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
  })
  @Field({ nullable: true })
  avatarUrl: string;

  @Field()
  @Column({ enum: UserRole, default: UserRole.Musician })
  role: UserRole;

  @CreateDateColumn()
  @Field()
  createdAt: string;
}

export default User;
