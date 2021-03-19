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
import { Email } from "./Email";

@Table({ tableName: "emails_types" })
export class EmailType extends Model<EmailType> {
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

  @HasMany(() => Email, "emailTypeId")
  email?: Email[];

}
