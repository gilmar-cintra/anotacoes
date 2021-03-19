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
import { LanguageLevel } from "./LanguageLevel";

@Table({ tableName: "languages" })
export class Language extends Model<Language> {
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  language: string;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

  @HasMany(() => LanguageLevel, "languageId")
  languages?: Language[];

}
