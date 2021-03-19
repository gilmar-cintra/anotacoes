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
import { Phone } from "./Phone";

@Table({ tableName: "phones_types" })
export class PhoneType extends Model<PhoneType> {
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

  @HasMany(() => Phone, "phoneTypeId")
  email?: Phone[];

}
