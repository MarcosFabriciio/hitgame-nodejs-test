import { IsString } from "class-validator";
import {
    BelongsTo,
    Column,
    DataType,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import { Team } from "src/teams/entities/team.entity";

export interface PlayerAttributes {
    id: number,
    name: string,
    position: string,
    height: string,
    weight: string,
    teamId?: number,
    dtcreation?: Date,
    dtupdate?: Date,
}

@Table({ tableName: "player", timestamps: false })
export class Player
    extends Model<PlayerAttributes, PlayerAttributes>
    implements PlayerAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id!: number;
    
    @Column({ type: DataType.STRING(255) })
    name!: string;

    @Column({ type: DataType.STRING(255) })
    position!: string;

    @Column({ type: DataType.DECIMAL(2, 2) })
    height!: string;

    @Column({ type: DataType.DECIMAL(2, 2) })
    weight!: string;

    @Column({ type: DataType.INTEGER })
    @Index({
        name: "fk_player_team_idx",
        using: "BTREE",
        order: "ASC",
        unique: false,
    })
    teamId?: number;

    @Column({
        allowNull: true,
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    dtcreation?: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    dtupdate?: Date;

    @BelongsTo(() => Team, { foreignKey: "teamId" })
    product: Team;
}
