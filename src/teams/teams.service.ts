import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { HelperService } from 'src/helpers/helper.service';
import { HelperConstants } from 'src/helpers/helperConstants';
import Result from 'src/interfaces/Result';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    private sequelize: Sequelize,
    private helperService: HelperService,

    @InjectModel(Team)
    private teamModel: typeof Team,
  ) { }


  create(createTeamDto: CreateTeamDto) {
    return this.teamModel.create(createTeamDto)
  }

  async findAll(page: number): Promise<Result> {
    const { count, rows } = await this.teamModel.findAndCountAll({
      limit: HelperConstants.RESULTS_PER_PAGE,
      offset: (page - 1) * HelperConstants.RESULTS_PER_PAGE,
    });

    let totalPages = this.helperService.calcTotalPages(count);

    return { count: count, data: rows, totalPages: totalPages };
  }

  findOne(id: number): Promise<Team> {
    return this.teamModel.findByPk(id);
  }
}