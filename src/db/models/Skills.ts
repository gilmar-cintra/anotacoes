/* eslint-disable camelcase */
import {
  Table,
  Model,
  Column,
  AllowNull,
  DataType,
  CreatedAt,
  UpdatedAt,
  NotEmpty,
  HasMany,
} from "sequelize-typescript";
import { SkillLevel } from "./SkillLevel";

@Table({ tableName: "skills" })
export class Skills extends Model<Skills> {
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  skill: string;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;


  @HasMany(() => SkillLevel, "skillId")
  skills?: Skills[];


}
