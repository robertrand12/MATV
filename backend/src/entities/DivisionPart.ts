import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Band from "./Band";
import InstrumentType from "./InstrumentType";

@Entity()
@ObjectType()
class DivisionPart extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nameOfVoice: string;

  @ManyToOne(() => Band, (b) => b.divisionParts, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => Band)
  band: Band;

  @Field()
  @Column({ type: "int" })
  numberOfMusicians: number;

  @JoinTable()
  @ManyToMany(() => InstrumentType)
  @Field(() => [InstrumentType])
  instrumentTypes: InstrumentType[];
}

export default DivisionPart;
