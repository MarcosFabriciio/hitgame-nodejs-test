import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { HelperService } from 'src/helpers/helper.service';
import { HelperConstants } from 'src/helpers/helperConstants';
import { Meta } from 'src/response/meta';
import { Pagination } from 'src/response/pagination';
import { RestResponse } from 'src/response/restResponse';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService, private helperService: HelperService) { }

  @Post("/create")
  async create(@Body() createPlayerDto: CreateTeamDto): Promise<RestResponse> {
    let restResponse = new RestResponse();
    try {
      const result = await this.teamsService.create(createPlayerDto);

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
      const result = await this.teamsService.findAll(page);

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
      const result = await this.teamsService.findOne(+id);

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
