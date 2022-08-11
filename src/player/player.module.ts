import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { Player } from './entities/player.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelperService } from 'src/helpers/helper.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Player]),
  ],
  controllers: [PlayerController],
  providers: [PlayerService, HelperService]
})
export class PlayerModule { }
