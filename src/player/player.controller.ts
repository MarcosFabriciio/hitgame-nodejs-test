import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { HelperService } from 'src/helpers/helper.service';
import { HelperConstants } from 'src/helpers/helperConstants';
import { Meta } from 'src/response/meta';
import { Pagination } from 'src/response/pagination';
import { RestResponse } from 'src/response/restResponse';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService, private helperService: HelperService) { }

  @Post("/create")
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<RestResponse> {
    let restResponse = new RestResponse();
    try {
      const result = await this.playerService.create(createPlayerDto);

      restResponse.data = result;
      restResponse.meta = new Meta(100, "SUCCESS");

    } catch (error) {
      restResponse.data = restResponse;
      restResponse.meta = this.helperService.returnMeta(
        HelperConstants.ERROR,
      );
    }

    return restResponse
  }

  @Get("/find-all")
  async findAll(
    @Query("page", ParseIntPipe) page: number,
  ): Promise<RestResponse> {
    let restResponse = new RestResponse();
    try {
      const result = await this.playerService.findAll(page);

      restResponse.data = result;
      restResponse.meta = new Meta(100, "SUCCESS");
      restResponse.meta.pagination = new Pagination(
        page,
        result.totalPages,
        result.count,
      );

    } catch (error) {
      restResponse.data = restResponse;
      restResponse.meta = this.helperService.returnMeta(
        HelperConstants.ERROR,
      );
    }

    return restResponse
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RestResponse> {
    let restResponse = new RestResponse();
    try {
      const result = await this.playerService.findOne(+id);

      restResponse.data = result;
      restResponse.meta = new Meta(100, "SUCCESS");
    } catch (error) {
      restResponse.data = restResponse;
      restResponse.meta = this.helperService.returnMeta(
        HelperConstants.ERROR,
      );
    }

    return restResponse
  }

  @Patch('/set-team/:id')
  async setTeam(@Param('id') id: string, @Query('teamId') teamId: number): Promise<RestResponse> {
    let restResponse = new RestResponse();
    try {
      const result = await this.playerService.setTeam(+id, teamId);

      restResponse.data = result;
      restResponse.meta = new Meta(100, "SUCCESS");
    } catch (error) {
      restResponse.data = restResponse;
      restResponse.meta = this.helperService.returnMeta(
        HelperConstants.ERROR,
      );
    }

    return restResponse
  }

  @Patch('/unset-team/:id')
  async unsetTeam(@Param('id') id: string,): Promise<RestResponse> {
    let restResponse = new RestResponse();
    try {
      const result = await this.playerService.unsetTeam(+id);

      restResponse.data = result;
      restResponse.meta = new Meta(100, "SUCCESS");
    } catch (error) {
      restResponse.data = restResponse;
      restResponse.meta = this.helperService.returnMeta(
        HelperConstants.ERROR,
      );
    }

    return restResponse
  }
}
