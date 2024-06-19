import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BandType from "./BandType";
import DivisionPart from "./DivisionPart";

@Entity()
@ObjectType()
class Band extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BandType, (bt) => bt.bands, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => BandType)
  bandType: BandType;

  @Field()
  @Column({ type: "int" })
  numberOfMusicians: number;

  @OneToMany(() => DivisionPart, (d) => d.band)
  divisionParts: DivisionPart[];
}

export default Band;
