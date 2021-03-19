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
import { EmailType } from "./EmailType";
import { User } from "./User";

@Table({ tableName: "emails" })
export class Email extends Model<Email> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  emailTypeId: number;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  email: string;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

  @BelongsTo(() => User, "userId")
  user?: User;

  @BelongsTo(() => EmailType, "emailTypeId")
  emailType?: EmailType[];
}
