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
import { Language } from "./Language";
import { User } from "./User";

@Table({ tableName: "languages_levels" })
export class LanguageLevel extends Model<LanguageLevel> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  languageId: number;

  @AllowNull(false)
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

  @BelongsTo(() => Language, "languageId")
  languages?: Language[];
}
