import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Band from "./Band";

@Entity()
@ObjectType()
class BandType extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({nullable: true})
  @Column({nullable: true, type: "text"})
  description: string;

  @OneToMany(() => Band, (b) => b.bandType)
  bands: Band[];
}

export default BandType;
