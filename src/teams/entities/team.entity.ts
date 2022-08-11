import {
    BelongsTo,
    Column,
    DataType,
    HasMany,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import { Player } from "src/player/entities/player.entity";
export interface TeamAttributes {
    id: number,
    name: string,
    openingDate: Date,
    state: string,
    dtcreation?: Date,
    dtupdate?: Date,
}

@Table({ tableName: "team", timestamps: false })
export class Team
    extends Model<TeamAttributes, TeamAttributes>
    implements TeamAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id!: number;

    @Column({ type: DataType.STRING(255) })
    name!: string;

    @Column({ type: DataType.DATE })
    openingDate!: Date;

    @Column({ type: DataType.STRING(255) })
    state!: string;

    @Column({
        allowNull: true,
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    dtcreation?: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    dtupdate?: Date;

    @HasMany(() => Player, { foreignKey: "teamId" })
    products: Player[];
}
