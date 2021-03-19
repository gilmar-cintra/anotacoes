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
import { Network } from "./Network";

@Table({ tableName: "networks_types" })
export class NetworkType extends Model<NetworkType> {
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  network: string;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

  @HasMany(() => Network, "networkTypeId")
  networks?: Network[];

}
