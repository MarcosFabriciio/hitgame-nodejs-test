import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Team } from './entities/team.entity';
import { HelperService } from 'src/helpers/helper.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Team])
  ],
  controllers: [TeamsController],
  providers: [TeamsService, HelperService]
})
export class TeamsModule {}
