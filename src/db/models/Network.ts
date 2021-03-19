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
import { NetworkType } from "./NetworkType";
import { User } from "./User";

@Table({ tableName: "networks" })
export class Network extends Model<Network> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  networkTypeId: number;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  link: string;

  @CreatedAt
  @Column(DataType.DATE)
  created?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated?: Date;

  @BelongsTo(() => User, "userId")
  user?: User;

  @BelongsTo(() => NetworkType, "networkTypeId")
  networkType?: NetworkType[];
}
