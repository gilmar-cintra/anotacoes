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
  BelongsTo,
} from "sequelize-typescript";
import { Skills } from "./Skills";
import { User } from "./User";

@Table({ tableName: "skills_levels" })
export class SkillLevel extends Model<SkillLevel> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  skillId: number;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.INTEGER)
  stars: number;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

  @BelongsTo(() => User, "userId")
  user?: User;

  @BelongsTo(() => Skills, "skillId")
  skill?: SkillLevel[];
}
