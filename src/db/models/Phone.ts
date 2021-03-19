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
import { PhoneType } from "./PhoneType";
import { User } from "./User";

@Table({ tableName: "phones" })
export class Phone extends Model<Phone> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  phoneTypeId: number;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  phone: string;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

  @BelongsTo(() => User, "userId")
  user?: User;

  @BelongsTo(() => PhoneType, "phoneTypeId")
  phoneType?: PhoneType[];
}
