import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    PlayerModule,
    TeamsModule,
    SequelizeModule.forRoot({
      dialect: "sqlite",
      storage: './hitgame.sqlite',
      synchronize: false,
      autoLoadModels: true,
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
  exports: [],
})
export class AppModule { }
