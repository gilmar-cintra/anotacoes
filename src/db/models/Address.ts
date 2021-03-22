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

@Table({ tableName: "addresses" })
export class Address extends Model<Address> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  place: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  number?: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  city: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  state: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  zipcode: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  complement?: string;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

  @BelongsTo(() => User, "userId")
  user?: User;

}
