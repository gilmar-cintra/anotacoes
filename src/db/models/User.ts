/* eslint-disable camelcase */
import {
  Table,
  Model,
  Column,
  AllowNull,
  Default,
  Unique,
  DataType,
  CreatedAt,
  UpdatedAt,
  DefaultScope,
  NotEmpty,
  HasMany,
} from "sequelize-typescript";
import { Email } from "./Email";
import { Field } from "./Field";
import { SkillLevel } from "./SkillLevel";

@Table({ tableName: "users" })
@DefaultScope(() => ({
  attributes: { exclude: ["password"] },
}))
export class User extends Model<User> {
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  name: string;

  @AllowNull(false)
  @NotEmpty
  @Unique
  @Column(DataType.TEXT)
  email: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  password: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  active: boolean;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

  @HasMany(() => Field, "userId")
  fields?: Field[];

  @HasMany(() => Email, "userId")
  emails?: Email[];

  @HasMany(() => SkillLevel, "userId")
  skillLevels?: SkillLevel[];
}
