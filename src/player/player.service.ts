import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { HelperService } from 'src/helpers/helper.service';
import { HelperConstants } from 'src/helpers/helperConstants';
import Result from 'src/interfaces/Result';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    private sequelize: Sequelize,
    private helperService: HelperService,

    @InjectModel(Player)
    private playerModel: typeof Player,
  ) { }


  create(createPlayerDto: CreatePlayerDto) {
    return this.playerModel.create(createPlayerDto)
  }

  async findAll(page: number): Promise<Result> {
    const { count, rows } = await this.playerModel.findAndCountAll({
      limit: HelperConstants.RESULTS_PER_PAGE,
      offset: (page - 1) * HelperConstants.RESULTS_PER_PAGE,
    });

    let totalPages = this.helperService.calcTotalPages(count);

    return { count: count, data: rows, totalPages: totalPages };
  }

  findOne(id: number): Promise<Player> {
    return this.playerModel.findByPk(id);
  }

  async setTeam(id: number, teamId: number) {
    const player = await this.findOne(id);

    if (player.teamId) {
      return { message: "Player already has a team associated"}
    } else {
      return this.playerModel.update({
        teamId: teamId
      }, {
        where: { id: id }
      });
    }
  }

  unsetTeam(id: number) {
    return this.playerModel.update({
      teamId: null
    }, {
      where: { id: id }
    });
  }
}