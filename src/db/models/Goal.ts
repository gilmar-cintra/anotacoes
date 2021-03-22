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
import { User } from "./User";

@Table({ tableName: "goals" })
export class Goal extends Model<Goal> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;


  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  goal: string;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

  @BelongsTo(() => User, "userId")
  user?: User;

}
