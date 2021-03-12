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
import { Field } from "./Field";

@Table({ tableName: "fields_types" })
export class FieldType extends Model<FieldType> {
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  type: string;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

  @HasMany(() => Field, "fieldTypeId")
  fields?: Field[];

}
