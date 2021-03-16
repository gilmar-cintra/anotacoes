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
import { FieldType } from "./FieldType";
import { User } from "./User";

@Table({ tableName: "fields" })
export class Field extends Model<Field> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  fieldTypeId: number;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  title: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  entity: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  startDate: Date;

  @AllowNull(true)
  @Column(DataType.DATEONLY)
  endDate: Date | null;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  description: string;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

  @BelongsTo(() => User, "userId")
  user?: User;

  @BelongsTo(() => FieldType, "fieldTypeId")
  fieldType?: FieldType[];
}
